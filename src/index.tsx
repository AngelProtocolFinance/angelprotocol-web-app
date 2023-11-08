import { Authenticator } from "@aws-amplify/ui-react";
import * as Sentry from "@sentry/react";
import { Amplify } from "aws-amplify";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loader from "components/Loader";
import { store } from "store/store";
import { initTheme } from "helpers";
import ErrorBoundary from "errors/ErrorBoundary";
import { appRoutes } from "constant/routes";
import config from "./aws-exports";
import "./index.css";

//set theme immediately, so even suspense loaders and can use it
initTheme();

const App = lazy(() => import("./App/App"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);

const container = document.getElementById("root");
const root = createRoot(container as Element);

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
});

config.oauth.redirectSignIn =
  window.location.origin + `${appRoutes.auth_redirector}/`;
config.oauth.redirectSignOut = window.location.origin + "/";
Amplify.configure(config);

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
