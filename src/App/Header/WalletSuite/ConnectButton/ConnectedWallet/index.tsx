import { Popover } from "@headlessui/react";
import {
  WalletState,
  useGetWallet,
} from "contexts/WalletContext/WalletContext";
import Icon, { DrawerIcon } from "components/Icon";
import { maskAddress } from "helpers";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletState) {
  const { isLoading } = useGetWallet();
  const maskedAddr = maskAddress(props.address);

  return (
    <Popover as="div" className="relative">
      <Popover.Button
        disabled={isLoading}
        className="flex grow-0 w-36 sm:w-44 h-10 py-2 px-3 justify-center items-center rounded-lg bg-orange hover:bg-orange-l1 text-white gap-2 font-bold text-xs sm:text-base"
      >
        {({ open }) => (
          <>
            <span>{maskedAddr}</span>
            <DrawerIcon isOpen={open} className="text-2xl opacity-50" />
          </>
        )}
      </Popover.Button>
      <Details {...props} />
    </Popover>
  );
}
