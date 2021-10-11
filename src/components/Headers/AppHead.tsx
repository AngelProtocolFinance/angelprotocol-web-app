import Logo from "components/Logo/Logo";
import Search from "components/Search/Search";
import Toolkit from "components/WalletSuite/Toolkit";
import WalletSuite from "components/WalletSuite/WalletSuite";

export default function AppHead() {
  return (
    <div className="flex items-center justify-between xl:container xl:mx-auto w-full px-5 h-24">
      <Logo />
      <div className="flex">
        <Search />
        <WalletSuite>
          <Toolkit />
        </WalletSuite>
      </div>
    </div>
  );
}
