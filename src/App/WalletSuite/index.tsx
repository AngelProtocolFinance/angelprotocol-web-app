import { Popover } from "@headlessui/react";
import withConnectedWallet, { useConnectedWallet } from "contexts/WalletGuard";
import { DrawerIcon } from "components/Icon";
import { maskAddress } from "helpers";
import Details from "./Details";
import SupportedNetworksMenu from "./SupportedNetworksMenu";
import WalletSelectorOpener from "./WalletSelectorOpener";
import { COMMON_BUTTON_STYLE } from "./constants";

function Wallet() {
  const wallet = useConnectedWallet();
  return (
    <Popover as="div" className="relative">
      <Popover.Button className={`${COMMON_BUTTON_STYLE} text-xs normal-case`}>
        {({ open }) => (
          <>
            <span>{maskAddress(wallet.address)}</span>
            <DrawerIcon isOpen={open} className="text-2xl opacity-50" />
          </>
        )}
      </Popover.Button>
      <Details {...wallet} />
    </Popover>
  );
}

export default withConnectedWallet(Wallet, {
  type: "replacement",
  loading: (
    <button className={COMMON_BUTTON_STYLE} disabled>
      Loading...
    </button>
  ),
  disconnected: WalletSelectorOpener,
  unsupported: SupportedNetworksMenu,
});
