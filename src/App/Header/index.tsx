import { Link } from "react-router-dom";
import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import MobileNav from "./MobileNav";
import DappMenu from "./Nav";

export default function Header() {
  return (
    <header className="mb-4 grid grid-cols-[auto_1fr_auto] items-center w-full padded-container pt-3">
      <Link rel="noreferrer" to="/" title="Go to Marketing page">
        <img src={betaWhiteLogo} alt="logo" className="w-32 sm:w-36" />
      </Link>
      <DappMenu />
      <div className="ml-auto grid grid-cols-[auto_1fr_auto]">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <MobileNav />
    </header>
  );
}
