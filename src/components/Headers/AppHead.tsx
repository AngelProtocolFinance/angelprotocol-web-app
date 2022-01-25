import Logo from "components/Logo/Logo";
import useWalletSwitcher from "components/WalletSuite/useWalletSwitcher";
import WalletSuite from "components/WalletSuite/WalletSuite";

export default function AppHead() {
  useWalletSwitcher();
  return (
    <div className="flex items-center justify-between w-full padded-container h-24">
      <Logo />
      <div className="flex">
        {/*<Search />*/}

        <WalletSuite />
      </div>
    </div>
  );
}
