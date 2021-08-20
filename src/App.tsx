import "./App.css";
import { Switch, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Donate from "pages/Donate";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import Home from "pages/Home";
import About from "pages/About";
import Goals from "pages/Goals";
import Login from "pages/Login";
import TerraConnector from "components/TerraConnector/TerraConnector";

const App = () => {
  return (
    <div className="grid grid-rows-app bg-gradient-to-b from-thin-blue to-black-blue">
      <Header hasMenu={true} hasTitle={true} />
      <Switch>
        <Route path="/test" component={TerraConnector} />
        <Route path="/about" component={About} />
        <Route path="/about-unsdgs" component={Goals} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/donate" component={Donate} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer hasMenu={true} />
    </div>
  );
};

export default App;
