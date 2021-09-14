import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { NetworkInfo, WalletProvider } from "@terra-money/wallet-provider";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "contexts/AuthProvider";

const localterra = {
  name: "localterra",
  chainID: "localterra",
  lcd: "http://localhost:1317",
};

const testnet = {
  name: "testnet",
  chainID: "tequila-0004",
  lcd: "https://tequila-lcd.terra.dev",
};

const mainnet = {
  name: "mainnet",
  chainID: "columbus-4",
  lcd: "https://lcd.terra.dev",
};

const bombay = {
  name: "bombay",
  chainID: "bombay-10",
  lcd: "https://bombay-lcd.terra.dev",
};

const walletConnectChainIds: Record<number, NetworkInfo> = {
  0: localterra,
  1: testnet,
  2: mainnet,
  3: bombay,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider
        defaultNetwork={testnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
