import { adminReducer } from "@/slices/admin";
import authReducer from "@/slices/authSlice";
import { componentReducer } from "@/slices/components";
import { apes } from "@ap/services/apes";
import { aws } from "@ap/services/aws";
import { countriesApi } from "@ap/services/countries";
import { junoApi } from "@ap/services/juno";
import { donation } from "@ap/slices/donation";
import { configureStore } from "@reduxjs/toolkit";
import gift from "libs/slices/gift/src/gift";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    donation,
    gift,
    auth: authReducer,
    component: componentReducer,
    [aws.reducerPath]: aws.reducer,
    [junoApi.reducerPath]: junoApi.reducer,
    [apes.reducerPath]: apes.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      junoApi.middleware,
      countriesApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
