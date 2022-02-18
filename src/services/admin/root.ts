import { combineReducers } from "redux";
import membersReducer from "./memberSlice";

export const adminReducer = combineReducers({
  members: membersReducer,
});
