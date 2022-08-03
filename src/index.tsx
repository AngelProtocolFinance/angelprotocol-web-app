import { WalletProvider, getChainOptions } from "@terra-money/wallet-provider";
import App from "App";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext/WalletContext";
import { store } from "store/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Readin chain options as per the official docs:
// https://docs.terra.money/docs/develop/wallet-provider/wallet-provider-tutorial.html#wrap-your-app-in-walletprovider
getChainOptions().then((chainOptions) =>
  ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <WalletProvider {...chainOptions}>
            <WalletContext>
              <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
                <App />
              </ModalContext>
            </WalletContext>
          </WalletProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
