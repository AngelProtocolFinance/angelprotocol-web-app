import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  PopoverPanel,
} from "@headlessui/react";
import { SearchIcon } from "lucide-react";
import type { ReactElement } from "react";

interface ITokenCombobox {
  on_change: (v: string) => void;
  value: string;
  opts: string[];
  q: string;
  on_q_change: (v: string) => void;
  opt_disp: (v: string) => ReactElement;
}
export interface ITokenOptions extends ITokenCombobox {
  classes?: string;
}
const container =
  "w-56 border border-gray-l3 p-1 [--anchor-max-height:15rem] overflow-y-auto rounded-md bg-gray-l5 dark:bg-blue-d7 shadow-lg focus:outline-hidden";
export function TokenOptions(props: ITokenOptions) {
  return (
    <PopoverPanel
      anchor={{ to: "bottom start", gap: 8 }}
      className={`${container} ${props.classes}`}
    >
      <TokenCombobox {...props} />
    </PopoverPanel>
  );
}

function TokenCombobox(x: ITokenCombobox) {
  return (
    <Combobox
      value={x.value}
      virtual={{ options: x.opts }}
      onChange={x.on_change}
    >
      <div className="grid grid-cols-[1fr_auto] p-2 gap-2 rounded-sm mb-1 border border-gray-l3">
        <ComboboxInput
          value={x.q}
          placeholder="Search..."
          className="text-left text-sm focus:outline-hidden bg-transparent"
          onChange={(event) => x.on_q_change(event.target.value)}
        />
        <SearchIcon size={20} />
      </div>

      {x.opts.length === 0 && x.q !== "" ? (
        <div className="relative cursor-default select-none py-2 px-4 text-sm">
          {x.q} not found
        </div>
      ) : (
        <ComboboxOptions className="py-1 w-full" static>
          {({ option }) => x.opt_disp(option as string)}
        </ComboboxOptions>
      )}
    </Combobox>
  );
}
