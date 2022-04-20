import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "services/admin/root";
import { apes } from "services/apes/apes";
import authReducer from "services/auth/authSlice";
import { aws } from "services/aws/aws";
import chainReducer from "services/chain/chainSlice";
import providerReducer from "services/provider/providerSlice";
import { terra } from "services/terra/terra";
import transactionReducer from "services/transaction/transactionSlice";
import userReducer from "services/user/userSlice";
import walletReducer from "services/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    chain: chainReducer,
    provider: providerReducer,
    wallet: walletReducer,
    admin: adminReducer,
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
