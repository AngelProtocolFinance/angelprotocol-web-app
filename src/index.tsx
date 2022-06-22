import { WalletProvider } from "@terra-money/wallet-provider";
import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WalletContext from "contexts/WalletContext/WalletContext";
import Loader from "components/Loader";
import { store } from "store/store";
import { chainOptions } from "constants/chainOptions";
import { siteRoutes } from "constants/routes";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App/App"));
const Website = lazy(() => import("./Website/Website"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            <Route
              path={`${siteRoutes.app}/*`}
              element={
                <WalletProvider {...chainOptions}>
                  <WalletContext>
                    <App />
                  </WalletContext>
                </WalletProvider>
              }
            />
            <Route path={`${siteRoutes.home}*`} element={<Website />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
