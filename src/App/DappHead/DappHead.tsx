import { useState } from "react";
import { Link } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import Icon from "components/Icon";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite/WalletSuite";
import { siteRoutes } from "constants/routes";
import DappMenu from "./DappMenu";
import MobileDappNav from "./MobileDappNav";

export default function DappHead() {
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }

  return (
    <header className="mb-4 grid grid-cols-a1a lg:grid-cols-aa1 items-center w-full padded-container pt-3">
      <Link to={siteRoutes.app} title="to home">
        <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
      </Link>
      <DappMenu />
      <div className="ml-auto grid grid-cols-a1a gap-1">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <button className={`text-white-grey ml-2 lg:hidden`} onClick={toggleNav}>
        {navShown ? (
          <Icon type="Close" className="text-2xl" />
        ) : (
          <Icon type="Menu" className="text-2xl" />
        )}
      </button>
      {navShown && <MobileDappNav />}
    </header>
  );
}
