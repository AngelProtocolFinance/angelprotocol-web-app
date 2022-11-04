import { Popover } from "@headlessui/react";
import { WalletState, useGetWallet } from "contexts/WalletContext";
import { DrawerIcon } from "components/Icon";
import { maskAddress } from "helpers";
import { COMMON_BUTTON_STYLE } from "../constants";
import Details from "./Details";

//this component won't be rendered if wallet is not connected
export default function ConnectedWallet(props: WalletState) {
  const { isLoading } = useGetWallet();
  const maskedAddr = maskAddress(props.address);

  return (
    <Popover as="div" className="relative">
      <Popover.Button
        disabled={isLoading}
        className={`${COMMON_BUTTON_STYLE} text-xs`}
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
