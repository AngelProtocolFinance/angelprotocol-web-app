import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import Loader from "components/Loader";
import { store } from "store/store";
import ErrorBoundary from "errors/ErrorBoundary";
import { siteRoutes } from "constants/routes";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App/App"));
const Website = lazy(() => import("./Website/Website"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
);

// Readin chain options as per the official docs:
// https://docs.terra.money/docs/develop/wallet-provider/wallet-provider-tutorial.html#wrap-your-app-in-walletprovider
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
          <ErrorBoundary>
            <Suspense fallback={<LoaderComponent />}>
              <Routes>
                <Route path={`${siteRoutes.app}/*`} element={<App />} />
                <Route path={`${siteRoutes.home}*`} element={<Website />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </ModalContext>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
