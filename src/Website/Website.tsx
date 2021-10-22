import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation,
} from "react-router-dom";
import Home from "pages/Home/Home";
// import About from "pages/About";
import Donors from "pages/Donors/Donors";
// import PrivacyPolicy from "pages/PrivacyPolicy";
import Charities from "pages/Charities/Charities";
import Contact from "pages/Contact/Contact";
import WebHead from "components/Headers/WebHead";
import WebFoot from "components/Footers/WebFoot";
import { site, web } from "types/routes";

const Website = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  return (
    <div className={`grid grid-rows-1a bg-white`}>
      <WebHead />
      <Switch>
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
        <Route path={`${path}${web.about}`} component={About} />
        <Route path={`${path}${web.contact}`} component={Contact} />
        {/* <Route path={`${path}${web.privacy}`} component={PrivacyPolicy} /> */}
        <Route path={`${path}${web.donors}`} component={Donors} />
        <Route path={`${path}${web.charities}`} component={Charities} />
        <Route path={`${path}${web.index}`} component={Home} />
        <Redirect from="*" to={site.home} />
      </Switch>
      <WebFoot />
    </div>
  );
};

export default Website;
