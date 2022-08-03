import App from "App/App";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "store/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Readin chain options as per the official docs:
// https://docs.terra.money/docs/develop/wallet-provider/wallet-provider-tutorial.html#wrap-your-app-in-walletprovider
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
