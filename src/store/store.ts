import { configureStore } from "@reduxjs/toolkit";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import userReducer from "../services/user/userSlice";
import chainReducer from "../services/chain/chainSlice";
import walletReducer from "../services/wallet/walletSlice";
import transactionReducer from "../services/transaction/transactionSlice";
import charityReducer from "../pages/Charity/charitySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    chain: chainReducer,
    charity: charityReducer,
    [aws.reducerPath]: aws.reducer,
    [terra.reducerPath]: terra.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, terra.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
