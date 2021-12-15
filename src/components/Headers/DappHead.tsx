import Logo from "components/Logo/Logo";
import MobileDappNav from "components/MobileNav/MobileDappNav";
import DappMenu from "components/NavMenus/DappMenu";
import useWalletSuite from "components/WalletSuite/useWalletSuite";
import WalletSuite from "components/WalletSuite/WalletSuite";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function DappHead() {
  useWalletSuite();
  const [navShown, showNav] = useState(false);

  function toggleNav() {
    showNav((prevState) => !prevState);
  }

  return (
    <header
      className={`mb-4 grid grid-cols-a1a md:grid-cols-aa1 items-center w-full z-10 padded-container pt-3`}
    >
      <Logo />
      <DappMenu />
      <WalletSuite />
      <button className={`text-white-grey ml-2 sm:hidden`} onClick={toggleNav}>
        {navShown ? (
          <IoClose className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
      </button>
      {navShown && <MobileDappNav />}
    </header>
  );
}
