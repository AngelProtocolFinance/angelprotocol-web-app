import { configureStore } from "@reduxjs/toolkit";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import userReducer from "../services/user/userSlice";
import chainReducer from "../services/chain/chainSlice";
import walletReducer from "../services/wallet/walletSlice";
import authReducer from "../services/auth/authSlice";
import transactionReducer from "../services/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    chain: chainReducer,
    auth: authReducer,
    [aws.reducerPath]: aws.reducer,
    [terra.reducerPath]: terra.reducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, terra.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
