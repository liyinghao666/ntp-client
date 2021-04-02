import { Map } from "immutable";
import { DefaultRootState } from "react-redux"
type configKeys = "serverAddress" | "serverPort" | "originAddress" | "receivePort"

declare module "react-redux" {
  interface DefaultRootState {
    config: Map<configKeys, string>
  }
}