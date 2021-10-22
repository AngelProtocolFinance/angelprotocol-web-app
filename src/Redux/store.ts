import { configureStore } from "@reduxjs/toolkit";
import { charityAPIs } from "api/charityAPIs";
import { keyPersonAPIs } from "api/keyPersonAPIs";
import { registerAPIs } from "api/registerAPIs";
import { endowmentAPI } from "api/endowmentsAPI/endowmentAPI";
import rootReducer from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      //TODO: condense to a single API, and use injectEndpoints for code splitting
      registerAPIs.middleware,
      charityAPIs.middleware,
      keyPersonAPIs.middleware,
      endowmentAPI.middleware,
    ]),
});
export type TStore = ReturnType<typeof store.getState>;
