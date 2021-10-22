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
import { store } from "Redux/store";
import AuthProvider from "contexts/AuthProvider";
import LoadPage from "pages/Loading/Loading";

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
