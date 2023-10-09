import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import authReducer from "slices/authSlice";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import widget from "slices/widget";

export const store = configureStore({
  reducer: {
    donation,
    gift,
    auth: authReducer,
    component: componentReducer,
    widget,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,

    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, apes.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
