import { createStore, combineReducers } from "redux"
import { Map } from "immutable"
import { CONFIG } from "../action"
import { storeConfig } from "../application.json"
const store = createStore(combineReducers({
  config: (state: Map<string, string> = Map({...storeConfig}), action) => {
    switch(action.type) {
      case CONFIG:
        return Map(action.payload)
      default:
        return state
    }
  }
}))
export default store