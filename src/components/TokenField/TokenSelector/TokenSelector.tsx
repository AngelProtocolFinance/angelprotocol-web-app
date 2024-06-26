import { Popover, PopoverButton } from "@headlessui/react";
import type { ChainID } from "types/chain";
import type { TokenWithAmount } from "types/tx";
import { DrawerIcon } from "../../Icon";
import TokenOptions from "./TokenOptions";
import type { OnTokenChange } from "./types";

interface Props {
  selectedChainId: ChainID | "";
  selectedToken: TokenWithAmount;
  onChange: OnTokenChange;
}
export default function TokenSelector({
  selectedChainId,
  onChange,
  selectedToken,
}: Props) {
  return (
    <Popover className="relative gap-1 flex justify-end dark:text-navy-l2 h-full">
      <PopoverButton className="flex items-center gap-1 focus:outline-none">
        {({ open }) => (
          <>
            <span>{selectedToken.symbol}</span>
            <DrawerIcon isOpen={open} size={24} />
          </>
        )}
      </PopoverButton>
      <TokenOptions
        token={selectedToken}
        onChange={onChange}
        selectedChainId={selectedChainId}
      />
    </Popover>
  );
}
