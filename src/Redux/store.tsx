import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const store = configureStore({ reducer: rootReducer });
export type TStore = ReturnType<typeof store.getState>;
