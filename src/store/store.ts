import { configureStore } from "@reduxjs/toolkit";
import { aws } from "services/aws/aws";
import userReducer from "../services/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [aws.reducerPath]: aws.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;
