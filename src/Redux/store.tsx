import { configureStore } from "@reduxjs/toolkit";
import { charityAPIs } from "api/charityAPIs";
import { keyPersonAPIs } from "api/keyPersonAPIs";
import { registerAPIs } from "api/registerAPIs";
import rootReducer from "./reducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      registerAPIs.middleware,
      charityAPIs.middleware,
      keyPersonAPIs.middleware,
    ]),
});
export type TStore = ReturnType<typeof store.getState>;
