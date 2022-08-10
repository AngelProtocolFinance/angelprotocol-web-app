import { Popover } from "@headlessui/react";
import {
  WalletState,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import maskAddress from "helpers/maskAddress";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletState) {
  const { isLoading } = useGetWallet();
  const maskedAddr = maskAddress(props.address);

  const { walletIcon } = props;
  return (
    <Popover as="div" className="relative">
      <Popover.Button
        disabled={isLoading}
        className="border border-zinc-50/30 rounded-md flex items-center py-2 px-3 text-white-grey disabled:text-grey-accent"
      >
        {(!isLoading && (
          <img
            src={walletIcon}
            alt=""
            className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
          />
        )) || <Icon type="Loading" className="animate-spin mr-1" />}
        <span className="pr-2 text-sm hidden sm:block">{maskedAddr}</span>
      </Popover.Button>
      <Details {...props} />
    </Popover>
  );
}
