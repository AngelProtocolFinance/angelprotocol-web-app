import Logo from "components/Logo/Logo";
import MobileDappNav from "components/MobileNav/MobileDappNav";
import DappMenu from "components/NavMenus/DappMenu";
import useWalletSuite from "components/WalletSuite/useWalletSuite";
import WalletSuite from "components/WalletSuite/WalletSuite";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function DappHead() {
  useWalletSuite();
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }
  return (
    <header
      className={`grid grid grid-cols-2 md:grid-cols-a1a items-center w-full h-24 z-10 padded-container`}
    >
      <Logo />
      <nav className="w-full grid grid-cols-a1a items-center justify-items-end padded-container md:ml-5">
        <DappMenu />
        <div className="flex">
          <WalletSuite />
        </div>
        <button
          className={`text-angel-grey block md:hidden ml-5`}
          onClick={toggleNav}
          style={{ width: "50px" }}
        >
          <FiMenu className="text-2xl" />
        </button>
        {navShown && <MobileDappNav />}
      </nav>
    </header>
  );
}
