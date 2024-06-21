import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import type { TokenWithAmount } from "types/tx";
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
      className="relative gap-1 flex justify-end dark:text-navy-l2 h-full"
    >
      <ComboboxInput
        displayValue={(x: TokenWithAmount) => x.symbol}
        readOnly
        className="focus:outline-none text-right pr-8 w-32 supports-[field-sizing]:[field-sizing:content] supports-[field-sizing]:w-auto"
      />
      <ComboboxButton className="absolute inset-y-0">
        {({ open }) => <DrawerIcon isOpen={open} size={24} />}
      </ComboboxButton>
      <TokenOptions onChange={onChange} selectedChainId={selectedChainId} />
    </Combobox>
  );
}
