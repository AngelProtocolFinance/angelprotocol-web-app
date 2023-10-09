import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import { axelar } from "services/axelar";
import { junoApi } from "services/juno";
import subgraph from "services/subgraph";
import { adminReducer } from "slices/admin";
import authReducer from "slices/authSlice";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import launchpad from "slices/launchpad";
import widget from "slices/widget";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    donation,
    gift,
    launchpad,
    auth: authReducer,
    component: componentReducer,
    widget,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
    [junoApi.reducerPath]: junoApi.reducer,
    [axelar.reducerPath]: axelar.reducer,
    [subgraph.reducerPath]: subgraph.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      junoApi.middleware,
      axelar.middleware,
      subgraph.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
