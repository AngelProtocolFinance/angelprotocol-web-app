import Icon from "components/Icon";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
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
          <div className="grid grid-cols-[auto_1fr_auto]">
            <TransactionHint />
            <WalletSuite />
            <Airdrop />
          </div>
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
