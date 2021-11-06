import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import App from "./App/App";
import Website from "Website/Website";
import { site } from "./types/routes";
import { Provider } from "react-redux";
import AuthProvider from "contexts/AuthProvider";
import { store } from "store/store";
import LoadPage from "pages/Loading/Loading";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://4da0ddd9b67e4801af699469048265f8@o1061537.ingest.sentry.io/6051923",
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const LazyApp = React.lazy(() => import("./App/App"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path={site.app}>
              <Suspense fallback={<LoadPage />}>
                <LazyApp />
              </Suspense>
            </Route>
            <Route path={site.home} component={Website} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
