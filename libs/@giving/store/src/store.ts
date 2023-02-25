import { apes } from "@giving/services/apes";
import { aws } from "@giving/services/aws/aws";
import { countriesApi } from "@giving/services/countries";
import { junoApi } from "@giving/services/juno";
import { adminReducer } from "@giving/slices/admin";
import { componentReducer } from "@giving/slices/components";
import { donation } from "@giving/slices/donation";
import gift from "@giving/slices/gift";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    donation,
    gift,
    component: componentReducer,
    [aws.reducerPath]: aws.reducer,
    [junoApi.reducerPath]: junoApi.reducer,
    [apes.reducerPath]: apes.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    //auth: authReducer,
    //future: futureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      junoApi.middleware,
      countriesApi.middleware,
    ]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
