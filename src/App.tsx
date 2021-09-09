import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Footer from "components/Layout/Footer";
import useAppBackground from "hooks/useAppBackground";
import Donate from "pages/Donate";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home/Home";
import About from "pages/About";
import Goals from "pages/Goals";
import Login from "pages/Login/Login";
import Register from "pages/registration/index";
import Contact from "pages/Contact/Contact";
import { routes } from "./types/types";
import HeaderColorProvider from "contexts/HeaderColorProvider";
import TCA from "pages/TCA/TCA";
import Head from "components/Head/Head";

const App = () => {
  const appBackround = useAppBackground();
  const location = useLocation();

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
        <Route path={routes.register} component={Register} />
        <Route path={routes.contact} component={Contact} />
        <Route path={routes.tca} component={TCA} />
        <Route path={`${routes.donate}/:charityId`} component={Donate} />
        <Route exact path={routes.home} component={Home} />
        <Redirect from="*" to={routes.donate} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
