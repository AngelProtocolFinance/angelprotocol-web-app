import { configureStore } from "@reduxjs/toolkit";
import { charityReducer } from "pages/Registration/store";
import { apes } from "services/apes/apes";
import { aws } from "services/aws/aws";
import { flipside } from "services/flipslide/flipslide";
import { terra } from "services/terra/terra";
import { adminReducer } from "slices/admin/root";
import authReducer from "slices/authSlice";
import transactionReducer from "slices/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    charity: charityReducer,
    transaction: transactionReducer,
    admin: adminReducer,
    auth: authReducer,
    [aws.reducerPath]: aws.reducer,
    [terra.reducerPath]: terra.reducer,
    [apes.reducerPath]: apes.reducer,
    [flipside.reducerPath]: flipside.reducer,
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
