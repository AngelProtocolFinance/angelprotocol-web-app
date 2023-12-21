import { Authenticator } from "@aws-amplify/ui-react";
import * as Sentry from "@sentry/react";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { IntercomProvider } from "react-use-intercom";
import Loader from "components/Loader";
import { store } from "store/store";
import ErrorBoundary from "errors/ErrorBoundary";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

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
  dsn: process.env.REACT_APP_SENTRY_DSN,
});

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoaderComponent />}>
            <Authenticator.Provider>
              <IntercomProvider appId="fh3v40sb" autoBoot>
                <App />
              </IntercomProvider>
            </Authenticator.Provider>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
