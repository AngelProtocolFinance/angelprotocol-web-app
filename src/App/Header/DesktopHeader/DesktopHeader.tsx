import WalletSuite from "components/WalletSuite";
import Logo from "../Logo";
import Header from "./Header";

export default function DesktopHeader() {
  return (
    <header className="hidden lg:grid grid-cols-[auto_1fr_auto] mb-4 items-center w-full padded-container pt-3">
      <Logo />
      <Header />
      <WalletSuite />
    </header>
  );
}
