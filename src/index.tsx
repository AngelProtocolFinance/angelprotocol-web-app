import { WalletProvider, getChainOptions } from "@terra-money/wallet-provider";
import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loader from "components/Loader";
import { store } from "store/store";
import ErrorBoundary from "errors/ErrorBoundary";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App/App"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
);

getChainOptions().then((chainOptions) =>
  ReactDOM.render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <WalletProvider {...chainOptions}>
              <Suspense fallback={<LoaderComponent />}>
                <App />
              </Suspense>
            </WalletProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
