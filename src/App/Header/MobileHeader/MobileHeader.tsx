import WalletSuite from "../../WalletSuite";
import Logo from "../Logo";
import MenuButton from "./MenuButton";

export default function MobileHeader() {
  return (
    <header className="flex lg:hidden justify-between items-center w-full padded-container">
      <Logo />
      <div className="flex justify-end gap-3">
        <WalletSuite />
        <MenuButton />
      </div>
    </header>
  );
}
