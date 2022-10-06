import betaWhiteLogo from "assets/images/angelprotocol-beta-horiz-wht.png";
import Icon, { IconTypes } from "components/Icon";
import TransactionHint from "components/Transactor/TransactionHint";
import Airdrop from "components/Transactors/Airdrop/Airdrop";
import WalletSuite from "components/WalletSuite";

type Props = {
  onMenuClick: () => void;
  menuIconType: IconTypes;
};

export default function HeaderContent({ onMenuClick, menuIconType }: Props) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto]  mb-4 items-center w-full padded-container pt-3">
      <a
        rel="noreferrer"
        href="https://angelprotocol.io/"
        title="Go to Marketing page"
      >
        <img src={betaWhiteLogo} alt="" className="w-24 sm:w-36" />
      </a>
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
