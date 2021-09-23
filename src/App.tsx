import "react-toastify/dist/ReactToastify.css";
import { routes } from "./types/types";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Footer from "components/Footer/Footer";
import useAppBackground from "hooks/useAppBackground";
import Donate from "pages/Donate";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home/Home";
import About from "pages/About";
import Login from "pages/Login/Login";
import Register from "pages/registration/index";
import Contact from "pages/Contact/Contact";
import TCA from "pages/TCA/TCA";
import UNSDGs from "pages/UNSDGs/UNSDGs";
import Header from "./layout/Header/Header";
import PrivacyPolicy from "pages/PrivacyPolicy";
import HeaderColorProvider from "contexts/HeaderColorProvider";

const App = () => {
  const appBackround = useAppBackground();
  const location = useLocation();

  return (
    <div className={`grid grid-rows-app ${appBackround}`}>
      <HeaderColorProvider>
        <Header />
      </HeaderColorProvider>

      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={routes.about} component={About} />
        <Route path={routes.about_unsdgs} component={UNSDGs} />
        <Route path={routes.dashboard} component={Dashboard} />
        <Route path={routes.donate} component={Donate} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.register} component={Register} />
        <Route path={routes.contact} component={Contact} />
        <Route path={routes.tca} component={TCA} />
        <Route path={routes.privacy_policy} component={PrivacyPolicy} />
        <Route path={`${routes.donate}/:charityId`} component={Donate} />
        <Route exact path={routes.home} component={Home} />
        <Redirect from="*" to={routes.donate} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
