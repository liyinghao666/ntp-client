// 由于在electron中使用了contextBridge来给window对象注入方法
declare interface Window {
  api: {
    send: (channel: ChannelString, data: any) => void,
    receive: (channel: ChannelString, callback: (event: any, data: SendData) => void) => void,
    invoke: (channel: ChannelString, data: any) => Promise,
    get: (url: string, data?: any) => Promise,
    post: (url: string, data: any) => Promise
  }
}
type ChannelString = "toMainProcess" | "toRendererProcess" | "invoke" | "call"
type SendData = {
  data: string
}