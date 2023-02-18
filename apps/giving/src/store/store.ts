import { countriesApi } from "@/services/countries";
import { junoApi } from "@/services/juno";
import { adminReducer } from "@/slices/admin";
import authReducer from "@/slices/authSlice";
import { componentReducer } from "@/slices/components";
import { donation } from "@/slices/donation";
import gift from "@/slices/gift";
import { apes } from "@ap/services/apes";
import { aws } from "@ap/services/aws";
import { configureStore } from "@reduxjs/toolkit";

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
