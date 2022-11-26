import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ModalContext from "contexts/ModalContext";
import Loader from "components/Loader";
import { store } from "store/store";
import ErrorBoundary from "errors/ErrorBoundary";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App/App"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
);

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <StrictMode>
    <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <Suspense fallback={<LoaderComponent />}>
              <App />
            </Suspense>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </ModalContext>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
