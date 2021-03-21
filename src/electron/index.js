const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const __DEV__ = process.env.NODE_ENV === 'development'
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
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadURL(path.join(__dirname, "../../dist/index"))
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
console.log("process.env.NODE_ENV: " + process.env.NODE_ENV)