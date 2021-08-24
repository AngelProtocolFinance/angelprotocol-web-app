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
import LoginTest from "pages/LoginTest";

const App = () => {
  const location = useLocation();
  const inLogin = /login/.test(location.pathname);
  const appColor = inLogin
    ? "bg-blue-400"
    : "bg-gradient-to-b from-thin-blue to-black-blue";

  return (
    <div className={`grid grid-rows-app ${appColor}`}>
      <Header hasMenu={true} hasTitle={inLogin} />
      <Switch>
        <Route path="/test" component={TerraConnector} />
        <Route path="/about" component={About} />
        <Route path="/about-unsdgs" component={Goals} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/donate" component={Donate} />
        <Route path="/login" component={Login} />
        <Route path="/login-test" component={LoginTest} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer hasMenu={!inLogin} />
    </div>
  );
};

export default App;
