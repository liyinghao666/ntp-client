import { Map } from "immutable";
type configKeys = "serverAddress" | "serverPort" | "originAddress" | "receivePort"

declare module "react-redux" {
  interface DefaultRootState {
    config: Map<configKeys, string>
  }
}