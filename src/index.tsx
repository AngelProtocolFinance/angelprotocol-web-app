import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
// import { NetworkInfo, WalletProvider } from "@terra-money/wallet-provider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthProvider from "contexts/AuthProvider";
// import App from "./App/App";
import Website from "Website/Website";
import { site } from "./types/routes";

// const localterra = {
//   name: "localterra",
//   chainID: "localterra",
//   lcd: "http://localhost:1317",
// };

// //how about tequilla testnet??
// const testnet = {
//   name: "testnet",
//   chainID: "bombay-10",
//   lcd: "https://bombay-lcd.terra.dev",
// };

// const mainnet = {
//   name: "mainnet",
//   chainID: "columbus-4",
//   lcd: "https://lcd.terra.dev",
// };

// const bombay = {
//   name: "bombay",
//   chainID: "bombay-10",
//   lcd: "https://bombay-lcd.terra.dev",
// };

// const walletConnectChainIds: Record<number, NetworkInfo> = {
//   0: localterra,
//   1: testnet,
//   2: mainnet,
//   3: bombay,
// };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <WalletProvider
        defaultNetwork={testnet}
        walletConnectChainIds={walletConnectChainIds}
      > */}
      <AuthProvider>
        <Switch>
          {/* <Route path={site.app} component={App} /> */}
          <Route path={site.home} component={Website} />
        </Switch>
      </AuthProvider>
      {/* </WalletProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
