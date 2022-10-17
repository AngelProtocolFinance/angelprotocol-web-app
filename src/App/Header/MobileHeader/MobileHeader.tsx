import Floater from "../Floater";
import Logo from "../Logo";
import WalletSuite from "../WalletSuite";
import MenuButton from "./MenuButton";

export default function MobileHeader() {
  return (
    <Floater classes="lg:hidden">
      <header className="flex justify-between items-center w-full padded-container">
        <Logo />
        <div className="flex justify-end gap-3">
          <WalletSuite />
          <MenuButton />
        </div>
      </header>
    </Floater>
  );
}
