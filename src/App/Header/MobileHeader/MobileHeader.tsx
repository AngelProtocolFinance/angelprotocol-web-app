import Icon from "components/Icon";
import WalletSuite from "components/WalletSuite";
import Logo from "../Logo";
import useMenuModal from "./useMenuModal";

export default function MobileHeader() {
  const openMenu = useMenuModal();

  return (
    <header className="lg:hidden">
      <div className="flex justify-between items-center w-full padded-container py-3">
        <Logo />
        <div className="flex justify-end gap-3">
          <WalletSuite />
          <button
            onClick={openMenu}
            className="flex items-center text-white-grey justify-center w-10 h-10"
          >
            <Icon type="Menu" className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
