import { combineReducers } from "redux";
import membersReducer from "./memberSlice";
import fundMemberReducer from "./fundMemberSlice";

export const adminReducer = combineReducers({
  members: membersReducer,
  fundMembers: fundMemberReducer,
});
