import { createStore, combineReducers } from "redux"
import { Map } from "immutable"
import { TEST } from "../action"
const store = createStore(combineReducers({
  test: (state = Map({}), action) => {
    switch(action.type) {
      case TEST:
        return state.set("test", "test")
      default:
        return state
    }
  }
}))
export default store