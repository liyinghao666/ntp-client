const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const axios = require("axios").default

const __DEV__ = process.env.NODE_ENV === 'development'
const __SERVER_ADDRESS__ = process.env.SERVER_ADDRESS ? process.env.SERVER_ADDRESS : "http://127.0.0.1:3000"

let mainWindow = null
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.webContents.openDevTools()
  if(__DEV__) {
    console.log("runing in DEVELOPMENT process!")
    mainWindow.loadURL('http://localhost:3000')
  } else {
    console.log("runing in PRODUCTION process!")
    mainWindow.loadURL(path.join(__dirname, "../../build/index.html"))
  }
}
app.on('ready', createWindow)
ipcMain.on('toMainProcess', (event, data) => {
  console.log('main process receive:' + data)
  const res = {
    name: 'lyh'
  }
  mainWindow.webContents.send('toRendererProcess', res)
})
ipcMain.handle("invoke", (event, data) => new Promise((res, rej) => {
  console.log("mainprocess handle invoke:")
  console.log(data)
  /**
   * 
   */
  res(data)
}))
ipcMain.handle("get", (event, data) => {
  data.url = __SERVER_ADDRESS__ + data.url
  console.log(`mainprocess handle get: ${data.url}`)
  return new Promise((resolve) => {
    axios({
      method: "GET",
      ...data,
    }).then((res) => {
      resolve(res.data)
    })  
  })
})
ipcMain.handle("post", (event, data) => {
  console.log("mainprocess handle get:")
  return axios({
    method: "POST",
    ...data,
    url: __SERVER_ADDRESS__ + '' + data.url
  })
})