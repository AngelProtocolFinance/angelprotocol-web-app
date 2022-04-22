import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { siteRoutes } from "types/routes";
import { store } from "store/store";
import Loader from "components/Loader/Loader";
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
            <Route path={`${siteRoutes.app}/*`} element={<App />} />
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
