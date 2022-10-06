import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import Logo from "../Logo";
import Content from "./Content";

export default function DesktopHeader() {
  return (
    <header className="hidden lg:grid grid-cols-[auto_1fr_auto] mb-4 items-center w-full padded-container pt-3">
      <Logo />
      <Content />
      <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
    </header>
  );
}
