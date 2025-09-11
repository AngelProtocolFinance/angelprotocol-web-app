import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { DrawerIcon } from "components/icon";
import debounce from "lodash/debounce";
import { useState } from "react";
import { useSearchParams } from "react-router";
import type { EndowmentOption } from "types/npo";
import { Options } from "./options";

interface Props {
  endow?: EndowmentOption;
  endows: EndowmentOption[];
  isLoading?: boolean;
}

export function EndowmentSelector({ endow, endows, isLoading }: Props) {
  const [params, setParams] = useSearchParams();
  const [search, set_search] = useState("");

  function handle_search_txt_change(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    set_search(event.target.value);
  }

  return (
    <Combobox
      disabled={isLoading}
      value={endow}
      onChange={(val) => {
        if (!val) return;
        const copy = new URLSearchParams(params);
        copy.set("id", val.id.toString());
        setParams(copy);
      }}
      as="div"
      by="name"
      className="relative"
    >
      <ComboboxInput
        placeholder="Search for an organization..."
        onChange={debounce(handle_search_txt_change, 500)}
        displayValue={(value?: EndowmentOption) =>
          value?.name ?? "Select an organization"
        }
        className="pl-4 field-input"
      />

      <ComboboxButton className="absolute top-1/2 -translate-y-1/2 right-4">
        {({ open }) => <DrawerIcon isOpen={open} size={20} />}
      </ComboboxButton>

      <Options search_text={search} init_opts={endows} />
    </Combobox>
  );
}
