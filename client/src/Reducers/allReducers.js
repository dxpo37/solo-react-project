import likeReducer from "./likeReducer"
import isLoggedReducer from "./isLoggedReducer"
import userReducer from "./userReducer"
import {combineReducers} from "redux"

 const allReducers = combineReducers({
  likeReducer,
  isLoggedReducer,
  userReducer
})

export default allReducers