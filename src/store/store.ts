import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import { countriesApi } from "services/countries";
import { junoApi } from "services/juno";
import { adminReducer } from "slices/admin";
import authReducer from "slices/authSlice";
import { componentReducer } from "slices/components";
import theme from "slices/theme";
import transactionReducer from "slices/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    theme,
    admin: adminReducer,
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
