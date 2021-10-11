import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App/App";
import Website from "Website/Website";
import { site } from "./types/routes";
import { Provider } from "react-redux";
import { store } from "Redux/store";
import { NetworkInfo, WalletProvider } from "@terra-money/wallet-provider";
import AuthProvider from "contexts/AuthProvider";

const localterra = {
  name: "localterra",
  chainID: "localterra",
  // lcd: "http://localhost:1317",
  lcd: process.env.REACT_APP_LOCALTERRA_LCD,
};

//how about tequilla testnet??
const testnet = {
  name: "testnet",
  chainID: "bombay-10",
  // lcd: "https://bombay-lcd.terra.dev",
  lcd: process.env.REACT_APP_TESTNET_LCD,
};

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  // lcd: "https://lcd.terra.dev",
  lcd: process.env.REACT_APP_MAINNET_LCD,
};

const bombay = {
  name: "bombay",
  chainID: "bombay-10",
  // lcd: "https://bombay-lcd.terra.dev",
  lcd: process.env.REACT_APP_BOMBAY_LCD,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path={site.app} component={App} />
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
