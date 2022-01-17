import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App/App";
import { site } from "./types/routes";
import { Provider } from "react-redux";
import AuthProvider from "contexts/AuthProvider";
import { store } from "store/store";
// import Admin from "Admin/Admin";
import Website from "Website/Website";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path={site.app} component={App} />
            {/*<Route path={site.admin} component={Admin} />*/}
            <Route path={site.home} component={Website} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
