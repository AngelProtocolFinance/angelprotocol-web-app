import { WalletProvider } from "@terra-money/wallet-provider";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import WalletContext from "contexts/WalletContext";
import Loader from "components/Loader";
import { store } from "store/store";
import { initTheme } from "helpers";
import ErrorBoundary from "errors/ErrorBoundary";
import { widgetRoutes } from "constants/routes";
import { chainOptions } from "./constants/chainOptions";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

//set theme immediately, so even suspense loaders and can use it
initTheme();

const App = lazy(() => import("./App/App"));
const DonateWidget = lazy(() => import("./DonateWidget"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoaderComponent />}>
            <WalletProvider {...chainOptions}>
              <WalletContext>
                <ModalContext>
                  <Routes>
                    <Route
                      path={`${widgetRoutes.donate}/:apiKey`}
                      element={<DonateWidget />}
                    />
                    <Route path="*" element={<App />} />
                  </Routes>
                </ModalContext>
              </WalletContext>
            </WalletProvider>
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
