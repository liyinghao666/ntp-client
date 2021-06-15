import { takeEvery } from "redux-saga/effects"
import { CONFIG } from "../action"
import { configAction } from "../page/setting"
export default function *sagaFunction() {
  yield takeEvery(CONFIG, sagaConfig)
}
function *sagaConfig(action: configAction) {
  // do something to modify the config by window.api
  yield window.api.config(action)
}