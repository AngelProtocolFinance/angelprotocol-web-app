import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mb-4 grid grid-cols-[auto_1fr_auto] items-center w-full padded-container pt-3">
      <a
        rel="noreferrer"
        href="https://angelprotocol.io/"
        title="Go to Marketing page"
      >
        <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
      </a>
      <DesktopNav />
      <div className="ml-auto grid grid-cols-[auto_auto_1fr_auto]">
        <ThemeToggle />
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <MobileNav />
    </header>
  );
}
