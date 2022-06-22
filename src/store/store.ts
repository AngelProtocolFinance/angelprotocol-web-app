import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes/apes";
import { aws } from "services/aws/aws";
import { flipside } from "services/flipslide/flipslide";
import { junoApi } from "services/juno";
import { terra } from "services/terra/terra";
import { adminReducer } from "slices/admin/root";
import authReducer from "slices/authSlice";
import transactionReducer from "slices/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    admin: adminReducer,
    auth: authReducer,
    [aws.reducerPath]: aws.reducer,
    [terra.reducerPath]: terra.reducer,
    [apes.reducerPath]: apes.reducer,
    [flipside.reducerPath]: flipside.reducer,
    [junoApi.reducerPath]: junoApi.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      terra.middleware,
      apes.middleware,
      junoApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
