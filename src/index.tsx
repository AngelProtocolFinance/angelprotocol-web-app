import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { NetworkInfo, WalletProvider } from "@terra-money/wallet-provider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App/App";
import Website from "Website/Website";
import { site } from "./types/routes";
import AuthProvider from "contexts/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <AuthProvider>
          <Route path={site.app} component={App} />
        </AuthProvider>
        <Route path={site.home} component={Website} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
