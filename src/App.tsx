import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import Contact from "pages/Contact/Contact";
import TCA from "pages/TCA/TCA";
import Footer from "components/Footer/Footer";
import Head from "components/Head/Head";
import { routes } from "./types/types";
import useAppBackground from "hooks/useAppBackground";
import HeaderColorProvider from "contexts/HeaderColorProvider";

const App = () => {
  const appBackround = useAppBackground();

  return (
    <div className={`grid grid-rows-app ${appBackround}`}>
      <HeaderColorProvider>
        <Head />
      </HeaderColorProvider>

      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={routes.contact} component={Contact} />
        <Route path={routes.login} component={Login} />
        <Route path={routes.tca} component={TCA} />
        <Route exact path={routes.home} component={Home} />
        <Redirect from="*" to="/donate" />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
