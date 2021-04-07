import { DefaultRootState } from "react-redux"

// 由于在electron中使用了contextBridge来给window对象注入方法
declare global {
  interface Window {
    api: {
      invoke: (channel: ChannelString, data: any) => Promise,
      get: (url: string, data?: any) => Promise,
      post: (url: string, data: any) => Promise,
      save: (data: DefaultRootState) => Promise,
      ntpcs: (data: string) => Promise,
      ntpbroadcast: {
        begin: function,
        end: function,
        subscribe: function
      }
    }
  }
}
type ChannelString = "toMainProcess" | "toRendererProcess" | "invoke" | "call"
type SendData = {
  data: string
}