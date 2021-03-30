import { FunctionComponent } from "react"
import Ntpcs from "./ntpcs"

interface Pages {
  [propName: string]: FunctionComponent
}
const pages: Pages = {
  Ntpcs
}
export default pages