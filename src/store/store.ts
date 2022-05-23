import { configureStore } from "@reduxjs/toolkit";
import { charityReducer } from "pages/Registration/store";
import { apes } from "services/apes/apes";
import { aws } from "services/aws/aws";
import { flipside } from "services/flipslide/flipslide";
import authReducer from "slices/authSlice";
import providerReducer from "slices/providerSlice";
import transactionReducer from "slices/transaction/transactionSlice";
import walletReducer from "slices/walletSlice";

export const store = configureStore({
  reducer: {
    charity: charityReducer,
    transaction: transactionReducer,
    provider: providerReducer,
    wallet: walletReducer,
    auth: authReducer,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
    [flipside.reducerPath]: flipside.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, apes.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
