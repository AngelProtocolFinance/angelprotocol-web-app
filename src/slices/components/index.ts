import { combineReducers } from "redux";
import marketFilter from "./marketFilter";
import mobileNav from "./mobileNav";

export const componentReducer = combineReducers({
  mobileNav,
  marketFilter,
});
