import { Popover } from "@headlessui/react";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import MyEndowment from "./MyEndowment";
import WalletDetails from "./WalletDetails";

export default function Details(props: WalletState) {
  const { disconnect } = useSetWallet();

  return (
    <Popover.Panel className="absolute top-2 right-0 grid w-80 bg-white rounded-lg border border-gray-l2 shadow-[0_0_16px_rgba(15,46,67,0.25)] text-gray-d2">
      <MyEndowment />
      <WalletDetails {...props} />
      <button
        onClick={disconnect}
        className="btn bg-orange-l5 uppercase text-sm hover:bg-orange-l3 px-8 py-2 font-body font-bold text-base rounded-b"
      >
        disconnect
      </button>
    </Popover.Panel>
  );
}
