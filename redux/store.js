import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers";


const reducer = combineReducers({
  user: userReducer,
  // profile: profileReducer
});

export const myStore = createStore(userReducer)