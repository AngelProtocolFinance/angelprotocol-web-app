import { combineReducers } from "redux";
import apCW4MembersReducer from "./apCW4Members";
import newFundMembersReducer from "./newFundMembers";
import fundMembersReducer from "./fundMembers";
import cwContractsReducer from "./cwContracts";
import allianceMembersReducer from "./allianceMembers";

export const adminReducer = combineReducers({
  apCW4Members: apCW4MembersReducer,
  newFundMembers: newFundMembersReducer,
  fundMembers: fundMembersReducer,
  cwContracts: cwContractsReducer,
  allianceMembers: allianceMembersReducer,
});
