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
import Register from "pages/registration/index";

const App = () => {
  const location = useLocation();
  const inLogin = /(login)|(register)/.test(location.pathname);
  const appColor = inLogin
    ? "bg-gradient-to-b from-thin-blue to-thin-grey"
    : "bg-gradient-to-b from-thin-blue to-black-blue";

  return (
    <div className={`grid grid-rows-app ${appColor}`}>
      <Header hasMenu={!inLogin} hasTitle={inLogin} />
      <Switch>
        <Route path="/test" component={TerraConnector} />
        <Route path="/about" component={About} />
        <Route path="/about-unsdgs" component={Goals} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/donate/:charityId" component={Donate} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer hasMenu={!inLogin} />
    </div>
  );
};

export default App;
