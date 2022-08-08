import { Popover } from "@headlessui/react";
import {
  WalletState,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import maskAddress from "helpers/maskAddress";
import toCurrency from "helpers/toCurrency";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletState) {
  const { isWalletLoading } = useGetWallet();
  const maskedAddr = maskAddress(props.address);

  const { walletIcon, displayCoin } = props;
  return (
    <Popover as="div" className="relative">
      <Popover.Button
        disabled={isWalletLoading}
        className="flex items-center py-2 px-3 text-white-grey disabled:text-grey-accent"
      >
        {(!isWalletLoading && (
          <img
            src={walletIcon}
            alt=""
            className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
          />
        )) || <Icon type="Loading" className="animate-spin mr-1" />}
        <span className="pr-2 text-sm hidden sm:block">{maskedAddr}</span>
        <span className="pl-2 text-sm text-sm sm:border-l">
          {displayCoin.symbol} {toCurrency(displayCoin.balance, 3, true)}
        </span>
      </Popover.Button>
      <Details {...props} />
    </Popover>
  );
}
