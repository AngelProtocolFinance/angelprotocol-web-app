import { Popover } from "@headlessui/react";
import {
  WalletState,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import { humanize, maskAddress } from "helpers";
import { connectWalletBtnStyle } from "../constants";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletState) {
  const { isLoading, wallet } = useGetWallet();
  const maskedAddr = maskAddress(props.address);

  const { walletIcon } = props;
  return (
    <Popover as="div" className="relative">
      <Popover.Button disabled={isLoading} className={connectWalletBtnStyle}>
        {(!isLoading && (
          <img
            src={walletIcon}
            alt=""
            className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
          />
        )) || <Icon type="Loading" className="animate-spin mr-1" />}
        <span className="px-2 text-sm">{maskedAddr}</span>
        <span className="pl-2 hidden sm:block border-l border-zinc-50/20 text-sm ">
          {humanize(wallet?.displayCoin.balance || 0, 3)}
        </span>
        <span className="text-xs pl-1 hidden sm:block">
          {wallet?.displayCoin.symbol}
        </span>
      </Popover.Button>
      <Details {...props} />
    </Popover>
  );
}
