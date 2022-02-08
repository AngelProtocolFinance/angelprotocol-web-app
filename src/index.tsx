import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { lazy, StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { site } from "./types/routes";
import { Provider } from "react-redux";
import AuthProvider from "contexts/AuthProvider";
import { store } from "store/store";
import Loader from "components/Loader/Loader";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const App = lazy(() => import("./App/App"));
// const Admin = lazy(() => import("./Admin/Admin"));
const Website = lazy(() => import("./Website/Website"));

const persistor = persistStore(store);

const LoaderComponent = () => (
  <Loader bgColorClass="bg-angel-blue" gapClass="gap-2" widthClass="w-4" />
);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<LoaderComponent />}>
              <Switch>
                <Route path={site.app} component={App} />
                {/*<Route path={site.admin} component={Admin} />*/}
                <Route path={site.home} component={Website} />
              </Switch>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
