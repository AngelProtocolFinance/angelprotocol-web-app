import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes/apes";
import { aws } from "services/aws/aws";
import { countriesApi } from "services/countries";
import { flipside } from "services/flipslide/flipslide";
import { junoApi } from "services/juno";
import { adminReducer } from "slices/admin/root";
import authReducer from "slices/authSlice";
import transactionReducer from "slices/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    admin: adminReducer,
    auth: authReducer,
    [aws.reducerPath]: aws.reducer,
    [junoApi.reducerPath]: junoApi.reducer,
    [apes.reducerPath]: apes.reducer,
    [flipside.reducerPath]: flipside.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      junoApi.middleware,
      flipside.middleware,
      countriesApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
