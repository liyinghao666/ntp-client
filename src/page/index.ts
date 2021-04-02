import { FunctionComponent } from "react"
import Ntpcs from "./ntpcs"
import NtpBroadcast from "./ntpbroadcast"
import Setting from "./setting"

interface Pages {
  [propName: string]: FunctionComponent
}
const pages: Pages = {
  Ntpcs,
  NtpBroadcast,
  Setting
}
export default pages