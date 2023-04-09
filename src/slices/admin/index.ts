import { combineReducers } from "redux";
import allianceMembersReducer from "./allianceMembers";
import applicationsReducer from "./applications";
import fundMembersReducer from "./fundMembers";
import newFundMembersReducer from "./newFundMembers";
import proposalsReducer from "./proposals";

export const adminReducer = combineReducers({
  newFundMembers: newFundMembersReducer,
  fundMembers: fundMembersReducer,
  allianceMembers: allianceMembersReducer,
  proposals: proposalsReducer,
  applications: applicationsReducer,
});
