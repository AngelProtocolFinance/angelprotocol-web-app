import * as Sentry from "@sentry/react";
import Loader from "components/Loader";
import ErrorBoundary from "errors/ErrorBoundary";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import * as auth from "slices/auth";
import { store } from "store/store";
import "./index.css";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import amplifyConfig from "constants/aws";
import type { OAuthState } from "types/auth";
import { routes } from "./App/App";

//set theme immediately, so even suspense loaders and can use it
// NOTE: Turning off option for Dark theme for now
// initTheme();

const container = document.getElementById("root");
const root = createRoot(container as Element);

Sentry.init({
  dsn: process.env.PUBLIC_SENTRY_DSN,
  environment: process.env.PUBLIC_ENVIRONMENT,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter(routes);

Amplify.configure(amplifyConfig);
store.dispatch(auth.loadSession());
Hub.listen("auth", async ({ payload }) => {
  switch (payload.event) {
    case "signedIn":
      store.dispatch(auth.loadSession(payload.data));
      break;
    case "signedOut":
      store.dispatch(auth.reset());
      break;
    case "tokenRefresh":
      store.dispatch(auth.loadSession());
      break;
    case "tokenRefresh_failure":
      store.dispatch(auth.reset());
      break;
    case "customOAuthState":
      const state: OAuthState = JSON.parse(payload.data);
      const { pathname = "/", data } = state;
      router.navigate({ pathname }, { state: data, replace: true });
  }
});

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} fallbackElement={<LoaderComponent />} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
