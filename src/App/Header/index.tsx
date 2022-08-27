import { Link } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop";
import { WalletSuite } from "components/WalletSuite";
import { appRoutes } from "constants/routes";
import MobileNav from "./MobileNav";
import DappMenu from "./Nav";

export default function Header() {
  return (
    <header className="mb-4 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_auto_1fr] items-center w-full padded-container pt-3">
      <Link to={appRoutes.index} title="to home">
        <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
      </Link>
      <DappMenu />
      <div className="ml-auto grid grid-cols-[auto_1fr_auto] gap-1">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <MobileNav />
    </header>
  );
}
