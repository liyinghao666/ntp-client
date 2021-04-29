import { DefaultRootState } from "react-redux"
import { configAction } from "../page/setting"

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
        subscribe: function,
        desubscribe: function
      },
      config: (action: configAction) => void
    }
  }
}
type ChannelString = "toMainProcess" | "toRendererProcess" | "invoke" | "call"
type SendData = {
  data: string
}