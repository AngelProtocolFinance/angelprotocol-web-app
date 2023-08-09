import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import { junoApi } from "services/juno";
import subgraph from "services/subgraph";
import { adminReducer } from "slices/admin";
import authReducer from "slices/authSlice";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import launchpad from "slices/launchpad";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    donation,
    gift,
    launchpad,
    auth: authReducer,
    component: componentReducer,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
    [junoApi.reducerPath]: junoApi.reducer,
    [subgraph.reducerPath]: subgraph.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      junoApi.middleware,
      subgraph.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
