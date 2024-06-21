import { Combobox, ComboboxButton } from "@headlessui/react";
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

      <ComboboxButton>
        {({ open }) => <DrawerIcon isOpen={open} size={24} />}
      </ComboboxButton>

      <TokenOptions
        onChange={onChange}
        classes="absolute right-0 top-2 z-10 mt-10"
        selectedChainId={selectedChainId}
      />
    </Combobox>
  );
}
