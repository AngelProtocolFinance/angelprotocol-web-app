import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import DesktopNav from "./DesktopNav";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <>
      <header className="hidden lg:grid grid-cols-[auto_1fr_auto] mb-4 items-center w-full padded-container pt-3">
        <a
          rel="noreferrer"
          href="https://angelprotocol.io/"
          title="Go to Marketing page"
        >
          <img src={betaWhiteLogo} alt="" className="w-32 sm:w-36" />
        </a>
        <DesktopNav />
        <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
          <TransactionHint />
          <WalletSuite />
          <Airdrop />
        </div>
      </header>
      <MobileHeader />
    </>
  );
}
