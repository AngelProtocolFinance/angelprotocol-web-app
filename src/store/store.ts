import { configureStore } from "@reduxjs/toolkit";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import { apes } from "services/apes/apes";
import userReducer from "../services/user/userSlice";
import chainReducer from "../services/chain/chainSlice";
import walletReducer from "../services/wallet/walletSlice";
import metamaskReducer from "../services/wallet/metamaskSlice";
import providerReducer from "../services/provider/providerSlice";
import transactionReducer from "../services/transaction/transactionSlice";
import authReducer from "../services/auth/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    chain: chainReducer,
    provider: providerReducer,
    wallet: walletReducer,
    metamask: metamaskReducer,
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
