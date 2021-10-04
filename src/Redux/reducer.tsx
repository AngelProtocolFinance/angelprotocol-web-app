import { userReducer } from "./slices/userSlice";
import { REGISTER_API_REDUCER_KEY, registerAPIs } from "api/registerAPIs";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
const reducers = {
  userReducer,
  [REGISTER_API_REDUCER_KEY]: registerAPIs.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export type RootState = ReturnType<typeof combinedReducer>;
export default rootReducer;
