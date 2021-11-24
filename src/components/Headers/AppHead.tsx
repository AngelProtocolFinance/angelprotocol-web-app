import Logo from "components/Logo/Logo";
import useWalletSuite from "components/WalletSuite/useWalletSuite";
import WalletSuite from "components/WalletSuite/WalletSuite";

export default function AppHead() {
  useWalletSuite();
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
