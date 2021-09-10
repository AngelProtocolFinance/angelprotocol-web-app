import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import Donate from "pages/Donate";
import Login from "pages/Login";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
// import Dashboard from "pages/Dashboard";
// import Home from "pages/Home";
// import About from "pages/About";
// import Goals from "pages/Goals";
// import Register from "pages/registration/index";

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
      </Switch>
      <Footer hasMenu={!inLogin} />
    </div>
  );
};

export default App;
