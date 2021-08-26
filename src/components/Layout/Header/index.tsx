import NavMenu from "../NavMenu";
import logo from "../../../assets/images/angelprotocol-horiz-wht.png";
import { Link } from "react-router-dom";
import TerraConnector from "components/TerraConnector/TerraConnector";
import { useLocation } from "react-router-dom";
import Logo from "components/Logo/Logo";

type HeaderProps = {
  hasMenu: boolean;
  hasTitle: boolean;
};
const Header = ({ hasMenu, hasTitle }: HeaderProps) => {
  return (
    <header>
      <nav className="container mx-auto flex justify-between items-center h-16 mt-5">
        <div className="container mx-auto flex justify-between items-center w-4/6">
          <Link to="/">
            <Logo />
          </Link>
          {hasMenu && (
            <div className="flex font-sans text-base w-9/12">
              <NavMenu />
            </div>
          )}
        </div>
        <div className="w-2/6 container mx-auto flex justify-end items-center">
          {hasTitle ? (
            <p className="font-bold text-white font-lg uppercase">
              give once, give forever
            </p>
          ) : (
            <div className="flex font-regular text-base text-white">
              <TerraConnector />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
