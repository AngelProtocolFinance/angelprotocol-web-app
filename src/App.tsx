import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import Donate from "pages/Donate";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import About from "pages/About";
import Goals from "pages/Goals";
import Login from "pages/Login";
<<<<<<< HEAD
import { routes } from "./types/types";
import useAppBackground from "hooks/useBackground";
=======
import Register from "pages/registration/index";
>>>>>>> main

const App = () => {
  const appBackround = useAppBackground();
  const location = useLocation();
  const inLogin = /(login)|(register)/.test(location.pathname);
  const appColor = inLogin
    ? "bg-gradient-to-b from-thin-blue to-thin-grey"
    : "bg-gradient-to-b from-thin-blue to-black-blue";

  return (
    <div className={`grid grid-rows-app ${appBackround}`}>
      <Header hasMenu={true} hasTitle={inLogin} />
      <Switch>
        <Route path={routes.test} component={TerraConnector} />
        <Route path={routes.about} component={About} />
        <Route path={routes.about_unsdgs} component={Goals} />
        <Route path={routes.dashboard} component={Dashboard} />
        <Route path={routes.donate} component={Donate} />
        <Route path={routes.login} component={Login} />
        <Route exact path={routes.home} component={Home} />
      </Switch>
      <Footer hasMenu={!inLogin} />
    </div>
  );
};

export default App;
