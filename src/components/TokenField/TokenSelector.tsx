import { Combobox } from "@headlessui/react";
import { DrawerIcon } from "../Icon";
import TokenOptions from "./TokenOptions";
import { SelectorProps } from "./types";

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
      <span className="text-sm">{selectedToken.symbol}</span>

      <Combobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={20} />}
      </Combobox.Button>

      <TokenOptions
        classes="absolute right-0 top-2 z-10 mt-10"
        selectedChainId={selectedChainId}
      />
    </Combobox>
  );
}
