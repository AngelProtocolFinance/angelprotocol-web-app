import { userReducer, UserSlice } from "./slices/userSlice";
import { REGISTER_API_REDUCER_KEY, registerAPIs } from "api/registerAPIs";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { charityAPIs, CHARITY_API_REDUCER_KEY } from "api/charityAPIs";
import { keyPersonAPIs, KEYPERSON_API_REDUCER_KEY } from "api/keyPersonAPIs";

const reducers = {
  [UserSlice.name]: userReducer,
  [REGISTER_API_REDUCER_KEY]: registerAPIs.reducer,
  [CHARITY_API_REDUCER_KEY]: charityAPIs.reducer,
  [KEYPERSON_API_REDUCER_KEY]: keyPersonAPIs.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;
export default rootReducer;
