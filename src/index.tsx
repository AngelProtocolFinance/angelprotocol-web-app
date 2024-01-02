import { Authenticator } from "@aws-amplify/ui-react";
import * as Sentry from "@sentry/react";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loader from "components/Loader";
import { store } from "store/store";
import ErrorBoundary from "errors/ErrorBoundary";
import "./index.css";

//set theme immediately, so even suspense loaders and can use it
// NOTE: Turning off option for Dark theme for now
// initTheme();

const App = lazy(() => import("./App/App"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);

const container = document.getElementById("root");
const root = createRoot(container as Element);

Sentry.init({
  dsn: process.env.PUBLIC_SENTRY_DSN,
});

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoaderComponent />}>
            <Authenticator.Provider>
              <App />
            </Authenticator.Provider>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
