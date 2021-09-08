import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
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
import PrivacyPolicy from "pages/PrivacyPolicy";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const inLogin = /(login)|(register)/.test(location.pathname);
  const appColor = /(login)/.test(location.pathname)
    ? "bg-gradient-to-b from-thin-blue to-thin-grey"
    : "bg-gradient-to-b from-thin-blue to-black-blue";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!inLogin) {
      if (token) {
        const decoded_data: any = jwt_decode(token);
        if (decoded_data.exp * 1000 <= Date.now()) {
          history.replace("/login");
        }
      } else {
        history.replace("/login");
      }
    }
  }, []);

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
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer hasMenu={!inLogin} />
    </div>
  );
};

export default App;
