import { combineReducers } from "redux";
import allianceMembers from "./allianceMembers";
import apCW4Members from "./apCW4Members";
import applications from "./applications";
import fundMembers from "./fundMembers";
import newFundMembers from "./newFundMembers";
import proposals from "./proposals";

export const admin = combineReducers({
  allianceMembers,
  apCW4Members,
  applications,
  fundMembers,
  newFundMembers,
  proposals,
});
