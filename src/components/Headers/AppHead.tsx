import Logo from "components/Logo/Logo";
import useProviderSwitcher from "components/WalletSuite/useProviderSwitcher";
import WalletSuite from "components/WalletSuite/WalletSuite";

export default function AppHead() {
  useProviderSwitcher();
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
