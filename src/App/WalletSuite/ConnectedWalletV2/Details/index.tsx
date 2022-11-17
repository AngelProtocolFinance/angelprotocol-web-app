import { Popover } from "@headlessui/react";
import { WalletState } from "contexts/WalletContext";

export default function Details(props: WalletState) {
  return (
    <Popover.Panel className="absolute top-2 right-0 grid bg-white rounded-lg border border-gray-l2 shadow-[0_0_16px_rgba(15,46,67,0.25)]"></Popover.Panel>
  );
}
