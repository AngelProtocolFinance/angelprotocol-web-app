import WalletSuite from "components/WalletSuite";
import Logo from "../Logo";
import Header from "./Header";

export default function DesktopHeader() {
  return (
    <header className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center w-full padded-container gap-5">
      <Logo />
      <Header />
      <WalletSuite />
    </header>
  );
}
