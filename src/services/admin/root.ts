import { combineReducers } from "redux";
import apCW4MembersReducer from "./apCW4Members";
import newFundMembersReducer from "./newFundMembers";

export const adminReducer = combineReducers({
  apCW4Members: apCW4MembersReducer,
  newFundMembers: newFundMembersReducer,
});
