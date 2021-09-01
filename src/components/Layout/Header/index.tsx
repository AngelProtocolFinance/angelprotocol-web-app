import NavMenu from "../NavMenu";
import { Link, Route, Switch } from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import Logo from "components/Logo/Logo";

const Header = () => {
  return (
    <header>
      <nav className="container mx-auto flex justify-between items-center h-16 mt-5">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavMenu parentStyles="w-9/12 ml-5" />
        <div className="w-2/6 container mx-auto flex justify-end items-center">
          <Switch>
            <Route path="/login">
              <p className="font-bold text-white font-lg uppercase">
                give once, give forever
              </p>
            </Route>
            <Route path="/">
              <div className="flex font-regular text-base text-white">
                <TerraConnector />
              </div>
            </Route>
          </Switch>
        </div>
      </nav>
    </header>
  );
};

export default Header;
