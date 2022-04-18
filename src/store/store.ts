import { configureStore } from "@reduxjs/toolkit";
import { charityReducer } from "pages/Registration/store";
import { apes } from "services/apes/apes";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import authReducer from "../services/auth/authSlice";
import chainReducer from "../services/chain/chainSlice";
import providerReducer from "../services/provider/providerSlice";
import transactionReducer from "../services/transaction/transactionSlice";
import walletReducer from "../services/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    charity: charityReducer,
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
