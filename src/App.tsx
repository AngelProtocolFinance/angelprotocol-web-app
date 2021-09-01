import "./App.css";
import { Switch, Route } from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import Donate from "pages/Donate";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import About from "pages/About";
import Goals from "pages/Goals";
import Login from "pages/Login";
import { routes } from "./types/types";
import useAppBackground from "hooks/useBackground";
import Register from "pages/registration/index";

const App = () => {
  const appBackround = useAppBackground();

  return (
    <div className={`grid grid-rows-app ${appBackround}`}>
      <Header />
      <Switch>
        <Route path={routes.test} component={TerraConnector} />
        <Route path={routes.about} component={About} />
        <Route path={routes.about_unsdgs} component={Goals} />
        <Route path={routes.dashboard} component={Dashboard} />
        <Route path={routes.donate} component={Donate} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.registration} component={Register} />
        <Route exact path={routes.home} component={Home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
