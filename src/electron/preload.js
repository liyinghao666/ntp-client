const { contextBridge, ipcRenderer } = require('electron')
const logMiddlewire = (callback) => (event, data) => {
  console.log("logMiddlewire invoked:")
  console.log(event)
  console.log(data)
  callback(event, data)
}
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },
  receive: (channel, callback) => {
    ipcRenderer.on(channel, logMiddlewire((event, data) => callback(event, data)))
  },
  delete: (channel, callback) => {
    ipcRenderer.off(channel, callback)
  },
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data)
  }
})
  