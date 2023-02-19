import { apes } from "@ap/services/apes";
import { aws } from "@ap/services/aws";
import { countriesApi } from "@ap/services/countries";
import { junoApi } from "@ap/services/juno";
import { admin } from "@ap/slices/admin";
import { donation } from "@ap/slices/donation";
import gift from "@ap/slices/gift";
import marketFilter from "@ap/slices/market-filter";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admin,
    donation,
    gift,
    marketFilter,
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
