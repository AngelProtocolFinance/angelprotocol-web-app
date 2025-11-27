import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { DrawerIcon } from "components/icon";
import { Info, LoadingStatus } from "components/status";
import debounce from "lodash/debounce";
import type { INpoOpt } from "../api";

interface Props {
  classes?: string;
  q: string;
  is_loading: boolean;
  on_q_change: (q: string) => void;
  on_change: (opt: INpoOpt) => void;
  opts: "loading" | (string & {}) | INpoOpt[];
  value: INpoOpt | undefined;
}

export function NpoSelector(p: Props) {
  const handle_q_change = (ev: React.ChangeEvent<HTMLInputElement>) => {
    p.on_q_change(ev.target.value);
  };
  return (
    <Combobox
      disabled={p.is_loading}
      value={p.value}
      onChange={(x) => x && p.on_change(x)}
      as="div"
      by="id"
      className="relative"
    >
      <ComboboxInput
        name="q"
        placeholder="Search for an organization..."
        onChange={debounce(handle_q_change, 500)}
        displayValue={(value?: INpoOpt) => value?.name ?? ""}
        className="field-input"
      />

      <ComboboxButton className="absolute top-4 right-4">
        {({ open }) => <DrawerIcon is_open={open} size={20} />}
      </ComboboxButton>

      <ComboboxOptions className="max-h-60 mt-2 z-10 w-full dark:bg-blue-d6 overflow-y-scroll">
        {p.opts === "loading" ? (
          <LoadingStatus classes="w-full text-sm p-2">
            Loading options..
          </LoadingStatus>
        ) : typeof p.opts === "string" ? (
          <Info classes="w-full text-sm p-2">{p.opts} not found</Info>
        ) : (
          p.opts.map((opt) => (
            <ComboboxOption
              className="data-selected:bg-blue-l3 hover:text-blue-d1 flex gap-2 p-2 text-sm"
              key={opt.id}
              value={opt}
            >
              {opt.name}
            </ComboboxOption>
          ))
        )}
      </ComboboxOptions>
    </Combobox>
  );
}
