import WalletSuite from "components/WalletSuite";
import Logo from "../Logo";
import MenuButton from "./MenuButton";

export default function MobileHeader() {
  return (
    <header className="lg:hidden flex justify-between items-center w-full padded-container py-3">
      <Logo />
      <div className="flex justify-end gap-3">
        <WalletSuite />
        <MenuButton />
      </div>
    </header>
  );
}
