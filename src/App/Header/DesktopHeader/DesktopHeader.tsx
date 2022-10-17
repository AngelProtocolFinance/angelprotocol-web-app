import Floater from "../Floater";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import WalletSuite from "../WalletSuite";
import NavLinks from "./NavLinks";

export default function DesktopHeader() {
  return (
    <Floater classes="hidden lg:block">
      <header className="grid grid-cols-[auto_1fr_auto] items-center w-full padded-container gap-5">
        <Logo />
        <NavLinks />
        <div className="flex gap-4">
          <ThemeToggle />
          <WalletSuite />
        </div>
      </header>
    </Floater>
  );
}
