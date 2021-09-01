import NavMenu from "../NavMenu";
import { Link, Route, Switch } from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import Logo from "components/Logo/Logo";
import useHeaderTextColor from "../../../hooks/useHeaderTextColor";

const Header = () => {
  const textColor = useHeaderTextColor();
  return (
    <header className="fixed w-full bg-blue-400">
      <nav className="container mx-auto flex justify-between items-center mt-5 px-5">
        <Link to="/">
          <Logo />
        </Link>

        <NavMenu parentStyles={`w-9/12 ml-5 ${textColor}`} />
        <div className="w-2/6 container mx-auto flex justify-end items-center">
          <Switch>
            <Route path="/login">
              <p className={`font-bold ${textColor} font-lg uppercase`}>
                give once, give forever
              </p>
            </Route>
            <Route path="/">
              <div className={`flex font-regular text-base ${textColor} `}>
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
