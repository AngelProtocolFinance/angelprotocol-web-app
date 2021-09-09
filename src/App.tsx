import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Home from "pages/Home/Home";
import Login from "pages/Login";
import { routes } from "./types/types";
import useAppBackground from "hooks/useAppBackground";
import Contact from "pages/Contact/Contact";
import HeaderColorProvider from "contexts/HeaderColorProvider";
import TCA from "pages/TCA/TCA";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import Footer from "components/Footer/Footer";
import Head from "components/Head/Head";

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const appBackround = useAppBackground();

  const inLogin = location.pathname === routes.login;
  const inHome = location.pathname === routes.home;

  useEffect(() => {
    const token = localStorage.getItem("token");
    // check if token was expired.
    if (!inLogin && !inHome) {
      if (token) {
        const decoded_data: any = jwt_decode(token);
        if (decoded_data.exp * 1000 <= Date.now()) {
          history.replace(routes.login);
        }
      } else {
        history.replace(routes.login);
      }
    }
  }, []);

  return (
    <div className={`grid grid-rows-app ${appBackround}`}>
      <HeaderColorProvider>
        <Head />
      </HeaderColorProvider>

      <Switch>
        <Route path={routes.contact} component={Contact} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.tca} component={TCA} />
        <Route exact path={routes.home} component={Home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
