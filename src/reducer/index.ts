import { createStore, combineReducers, applyMiddleware } from "redux"
import { Map } from "immutable"
import { CONFIG } from "../action"
import { storeConfig } from "../application.json"
import  createSagaMiddleware  from "redux-saga"
import sagaFunction from "./saga"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers({
  config: (state: Map<string, string> = Map({...storeConfig}), action) => {
    switch(action.type) {
      case CONFIG:
        return Map(action.payload)
      default:
        return state
    }
  }
}), applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagaFunction)

export default store