import { combineReducers } from "redux";
import allianceMembersReducer from "./allianceMembers";
import apCW4MembersReducer from "./apCW4Members";
import fundMembersReducer from "./fundMembers";
import newFundMembersReducer from "./newFundMembers";
import proposalsReducer from "./proposals";

export const adminReducer = combineReducers({
  apCW4Members: apCW4MembersReducer,
  newFundMembers: newFundMembersReducer,
  fundMembers: fundMembersReducer,
  allianceMembers: allianceMembersReducer,
  proposals: proposalsReducer,
});
