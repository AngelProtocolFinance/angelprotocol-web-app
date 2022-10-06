import Icon, { IconTypes } from "components/Icon";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";
import Logo from "../Logo";

type Props = {
  onMenuClick: () => void;
  menuIconType: IconTypes;
};

export default function Content({ onMenuClick, menuIconType }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto]  mb-4 items-center w-full padded-container pt-3">
      <Logo />
      <div className="ml-5 grid grid-cols-[auto_1fr_auto]">
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <button
        onClick={onMenuClick}
        className="flex p-2 items-center text-white-grey justify-center"
      >
        <Icon type={menuIconType} className="text-2xl" />
      </button>
    </div>
  );
}
