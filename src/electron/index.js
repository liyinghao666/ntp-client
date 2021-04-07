const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const axios = require("axios").default
const ntpCS = require("./ntp-clientserver")
const { begin, end, subscribe } = require("./ntp-broadcast")

const __DEV__ = process.env.NODE_ENV === 'development'
const __SERVER_ADDRESS__ = process.env.SERVER_ADDRESS ? process.env.SERVER_ADDRESS : "http://127.0.0.1:3000"
const __APP_PATH__ = app.getAppPath()

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
    console.log(`APP is now in path ${__APP_PATH__}`)
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
ipcMain.handle("save", (event, data) => {
  console.log("save to localstorage")
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__APP_PATH__, "storage.json"), JSON.stringify(data), (err) => {
      if(err) {
        reject(err)
      } else {
        resolve("success")
      }
    })
  })
})
ipcMain.handle("ntpcs", (event, serverUrl) => {
  console.log("ntpcs called:" + serverUrl)
  return ntpCS(serverUrl)
})
ipcMain.on("ntpbroadcast begin", () => {
  begin()
})
ipcMain.on("ntpbroadcast end", () => {
  end()
})
subscribe((d) => {
  mainWindow.webContents.send("ntpbroadcast message", d)
})