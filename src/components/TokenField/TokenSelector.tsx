import { Combobox } from "@headlessui/react";
import { DrawerIcon } from "../Icon";
import TokenOptions from "./TokenOptions";
import type { SelectorProps } from "./types";

export default function TokenSelector({
  selectedChainId,
  onChange,
  selectedToken,
}: SelectorProps) {
  return (
    <Combobox
      value={selectedToken}
      onChange={onChange}
      as="div"
      className="flex items-center gap-1 w-full dark:text-navy-l2"
    >
      <span className="font-medium">{selectedToken.symbol}</span>

      <Combobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={24} />}
      </Combobox.Button>

      <TokenOptions
        amount={selectedToken.amount}
        onChange={onChange}
        classes="absolute right-0 top-2 z-10 mt-10"
        selectedChainId={selectedChainId}
      />
    </Combobox>
  );
}
