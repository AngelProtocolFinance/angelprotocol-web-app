import { Link } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import { appRoutes } from "constants/routes";
import MobileNav from "./MobileNav";
import DappMenu from "./Nav";

export default function Header() {
  return (
    <header className="mb-4 grid grid-cols-a1a lg:grid-cols-aa1 items-center w-full padded-container pt-3">
      <Link to={appRoutes.index} title="to home">
        <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
      </Link>
      <DappMenu />
      <div className="ml-auto grid grid-cols-a1a gap-1">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <MobileNav />
    </header>
  );
}
