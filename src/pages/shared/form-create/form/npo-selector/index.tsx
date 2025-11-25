import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { DrawerIcon } from "components/icon";
import debounce from "lodash/debounce";
import { useState } from "react";
import { useSearchParams } from "react-router";
import type { INpoOpt } from "../../api";
import { Options } from "./options";

interface Props {
  value?: INpoOpt;
  opts: INpoOpt[];
  is_loading?: boolean;
}

export function NpoSelector({ value, opts, is_loading }: Props) {
  const [, set_params] = useSearchParams();
  const [search, set_search] = useState("");

  function handle_search_txt_change(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    set_search(event.target.value);
  }

  return (
    <Combobox
      disabled={is_loading}
      value={value}
      onChange={(val) => {
        if (!val) return;
        set_params((x) => {
          x.set("npo_id", val.id.toString());
          return x;
        });
      }}
      as="div"
      by="name"
      className="relative"
    >
      <ComboboxInput
        placeholder="Search for an organization..."
        onChange={debounce(handle_search_txt_change, 500)}
        displayValue={(value?: INpoOpt) =>
          value?.name ?? "Select an organization"
        }
        className="pl-4 field-input"
      />

      <ComboboxButton className="absolute top-1/2 -translate-y-1/2 right-4">
        {({ open }) => <DrawerIcon is_open={open} size={20} />}
      </ComboboxButton>

      <Options search_text={search} init_opts={opts} />
    </Combobox>
  );
}
