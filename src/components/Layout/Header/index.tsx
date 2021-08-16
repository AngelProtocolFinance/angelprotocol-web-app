import NavMenu from "../NavMenu";
import { ConnectTerraButton } from "../../ConnectTerraButton";
import logo from "../../../assets/images/angelprotocol-horiz-wht.png";

interface HeaderProps {
  hasMenu: boolean;
  wallet?: {
    terraAddress: string;
  };
  onConnect: () => void;
  onDisconnect: () => void;
}

const Header = ({ hasMenu, wallet, onConnect, onDisconnect }: HeaderProps) => {
  return (
    <header>
      <nav className="container mx-auto flex justify-between items-center h-16 mt-5">
        <div className="container mx-auto flex justify-between items-center w-4/6">
          <a href="/" className="font-bold text-base">
            <img src={logo} alt="AngelProtocol" width="150" />
          </a>
          {hasMenu && (
            <div className="flex font-sans text-base w-9/12">
              <NavMenu />
            </div>
          )}
        </div>
        <div className="w-2/6 container mx-auto flex justify-end items-center">
          <ul className="flex font-regular text-base text-white">
            <ConnectTerraButton />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
