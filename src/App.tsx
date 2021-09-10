import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Footer from "components/Footer/Footer";
import useAppBackground from "hooks/useAppBackground";
import Donate from "pages/Donate";
import Login from "pages/Login";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
// import Dashboard from "pages/Dashboard";
// import Home from "pages/Home";
// import About from "pages/About";
// import Goals from "pages/Goals";
// import Register from "pages/registration/index";
import Contact from "pages/Contact/Contact";
import TCA from "pages/TCA/TCA";
import { routes } from "./types/types";
import HeaderColorProvider from "contexts/HeaderColorProvider";
import Header from "./layout/Header/Header";

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
        <Route exact path="/test" component={TerraConnector} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/login" component={Login} />
        <Redirect from="*" to="/donate" />
        {/* <Route exact path="/about" component={About} /> */}
        {/* <Route exact path="/about-unsdgs" component={Goals} /> */}
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        {/* <Route exact path="/register" component={Register} /> */}
        {/* <Route exact path="/" component={Home} /> */}
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
