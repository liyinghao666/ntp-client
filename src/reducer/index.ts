import { createStore, combineReducers } from "redux"
import { Map } from "immutable"
import { CONFIG } from "../action"
const store = createStore(combineReducers({
  config: (state: Map<string, string> = Map({
    serverAddress: "",
    serverPort: "",
    originAddress: "",
    receivePort: ""
  }), action) => {
    switch(action.type) {
      case CONFIG:
        return Map(action.payload)
      default:
        return state
    }
  }
}))
export default store