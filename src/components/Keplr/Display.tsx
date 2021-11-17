// import metaMaskIcon from "assets/icons/wallets/metamask.png";
import Icon from "components/WalletSuite/Icon";
import maskAddress from "helpers/maskAddress";
import { useGetKeplr, useSetKeplr } from "wallets/Keplr";
export default function Display() {
  const { address } = useGetKeplr();
  const { disconnect } = useSetKeplr();
  //this component won't be rendered if wallet is not connected

  return (
    <div className="flex">
      <div className="flex items-center py-2 px-3">
        <Icon />
        <span className="pr-2 text-sm text-white-grey hidden sm:block">
          {maskAddress(address)}
        </span>
        <button
          onClick={disconnect}
          className="pl-2 text-sm text-sm text-white-grey sm:border-l"
        >
          disconnect
        </button>
      </div>
    </div>
  );
}
