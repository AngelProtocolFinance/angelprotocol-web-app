import WalletSuite from "../../WalletSuite";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import NavLinks from "./NavLinks";

export default function DesktopHeader() {
  return (
    <header className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center w-full padded-container gap-5">
      <Logo />
      <NavLinks />
      <div className="flex gap-4">
        <ThemeToggle />
        <WalletSuite />
      </div>
    </header>
  );
}
