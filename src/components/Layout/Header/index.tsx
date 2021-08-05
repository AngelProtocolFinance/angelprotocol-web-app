import NavMenu from "../NavMenu";
import { ConnectTerraButton } from "../../ConnectTerraButton";

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
      <nav className="container mx-auto flex justify-between items-center h-16 px-10 my-5">
        <div className="container mx-auto flex justify-between items-center w-4/6">
          <a href="/" className="font-bold text-base">
            <img
              src="assets/images/angelprotocol-horiz-wht.png"
              alt="AngelProtocol"
              width="50"
            />
          </a>
          {hasMenu && <NavMenu />}
        </div>
        <div className="w-2/6 container mx-auto flex justify-end items-center">
          <ul className="flex font-regular text-base text-white">
            <ConnectTerraButton></ConnectTerraButton>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
