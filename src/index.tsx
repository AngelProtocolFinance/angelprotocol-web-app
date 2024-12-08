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
import { store } from "store/store";
import "./index.css";
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
