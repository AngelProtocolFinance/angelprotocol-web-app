import NavMenu from "../NavMenu";
import { Link, Route, Switch } from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import Logo from "components/Logo/Logo";
import { useHeaderColors } from "contexts/HeaderColorProvider";

const Header = () => {
  const { bgColor, textColor } = useHeaderColors();

  return (
    <header
      className={`grid fixed w-full ${bgColor} h-24 z-10 transition-shadow`}
    >
      <nav className="container mx-auto flex justify-between items-center px-5">
        <Link to="/">
          <Logo />
        </Link>

        <NavMenu />
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
