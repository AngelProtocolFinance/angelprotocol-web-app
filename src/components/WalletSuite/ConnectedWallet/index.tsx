import { Popover } from "@headlessui/react";
import { WalletInfo } from "contexts/Wallet";
import { maskAddress } from "helpers";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletInfo) {
  const { address, logo } = props;
  const maskedAddr = maskAddress(address);

  return (
    <Popover as="div" className="relative">
      <Popover.Button className="border border-zinc-50/30 rounded-md flex items-center py-2 px-3 text-white-grey disabled:text-grey-accent focus:outline-none">
        <img
          src={logo}
          alt=""
          className="w-6 h-6 object-contain rounded-full mr-0 sm:mr-2 bg-white p-0.5"
        />
        <span className="px-2 text-sm">{maskedAddr}</span>
      </Popover.Button>
      <Details {...props} />
    </Popover>
  );
}
