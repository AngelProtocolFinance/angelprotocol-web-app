import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "slices/walletSlice";
import { apes } from "services/apes/apes";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import authReducer from "../slices/authSlice";
import chainReducer from "../slices/chainSlice";
import providerReducer from "../slices/providerSlice";
import transactionReducer from "../slices/transaction/transactionSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    chain: chainReducer,
    provider: providerReducer,
    wallet: walletReducer,
    auth: authReducer,
    [aws.reducerPath]: aws.reducer,
    [terra.reducerPath]: terra.reducer,
    [apes.reducerPath]: apes.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      terra.middleware,
      apes.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
