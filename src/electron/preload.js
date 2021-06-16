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
  },
  get: (url, data) => {
    return ipcRenderer.invoke("get", Object.assign({url}, data))
  },
  post: (url, data) => {
    return ipcRenderer.invoke("post", Object.assign({url}, data))
  },
  save: (data) => {
    return ipcRenderer.invoke("save", data)
  },
  ntpcs: (data) => {
    return ipcRenderer.invoke("ntpcs", data)
  },
  ntpbroadcast: {
    begin: () => ipcRenderer.send("ntpbroadcast begin"),
    end: () => ipcRenderer.send("ntpbroadcast end"),
    subscribe: (callback) => {
      ipcRenderer.on("ntpbroadcast message", (event, message, from) => callback(message, from))
    },
    desubscribe: (callback) => {
      ipcRenderer.removeAllListeners("ntpbroadcast message")
    }
  },
  config: action => {
    ipcRenderer.send("config", action.payload)
  }
})
  