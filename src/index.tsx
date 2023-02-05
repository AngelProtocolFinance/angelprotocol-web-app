import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";
import Loader from "components/Loader";
import { store } from "store/store";
import { initTheme } from "helpers";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

//set theme immediately, so even suspense loaders and can use it
initTheme();

const App = lazy(() => import("./App/App"));

const LoaderComponent = () => (
  <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
);

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <StrictMode>
    <ErrorBoundary classes="place-self-center">
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoaderComponent />}>
            <App />
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
