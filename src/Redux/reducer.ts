import { userReducer, UserSlice } from "./slices/userSlice";
import { registerAPIs } from "api/registerAPIs";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { charityAPIs } from "api/charityAPIs";
import { keyPersonAPIs } from "api/keyPersonAPIs";

const reducers = {
  [UserSlice.name]: userReducer,
  [registerAPIs.reducerPath]: registerAPIs.reducer,
  [charityAPIs.reducerPath]: charityAPIs.reducer,
  [keyPersonAPIs.reducerPath]: keyPersonAPIs.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;
export default rootReducer;
