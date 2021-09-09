import "react-toastify/dist/ReactToastify.css";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Footer from "components/Layout/Footer";
import Donate from "pages/Donate";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home/Home";
import About from "pages/About";
import Goals from "pages/Goals";
import Login from "pages/Login";
import { routes } from "./types/types";
import useAppBackground from "hooks/useAppBackground";
import Register from "pages/registration/index";
import Contact from "pages/Contact/Contact";
import HeaderColorProvider from "contexts/HeaderColorProvider";
import TCA from "pages/TCA/TCA";
import Head from "components/Head/Head";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

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
      //TODO: guard should only work when user tries to go to donate page
      if (token) {
        const decoded_data: any = jwt_decode(token);
        if (decoded_data.exp * 1000 <= Date.now()) {
          history.replace(routes.login);
        }
      } else {
        history.replace(routes.login);
      }
    }
  }, [location.pathname]);

  return (
    <div className={`grid grid-rows-app ${appBackround}`}>
      <HeaderColorProvider>
        <Head />
      </HeaderColorProvider>

      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={routes.about} component={About} />
        <Route path={routes.about_unsdgs} component={Goals} />
        <Route path={routes.dashboard} component={Dashboard} />
        <Route path={routes.donate} component={Donate} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.registration} component={Register} />
        <Route path={routes.contact} component={Contact} />
        <Route path={routes.tca} component={TCA} />
        <Route path={`${routes.donate}/charityId`} component={Donate} />
        <Route exact path={routes.home} component={Home} />
        <Redirect from="*" to={routes.donate} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
