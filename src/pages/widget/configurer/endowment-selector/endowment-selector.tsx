import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { useSearchParams } from "@remix-run/react";
import { DrawerIcon } from "components/icon";
import debounce from "lodash/debounce";
import { useState } from "react";
import type { EndowmentOption } from "types/aws";
import Options from "./options";

interface Props {
  endow?: EndowmentOption;
  isLoading?: boolean;
}

export function EndowmentSelector({ endow, isLoading }: Props) {
  const [params, setParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
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
        onChange={debounce(handleSearchTextChange, 500)}
        displayValue={(value?: EndowmentOption) =>
          value?.name ?? "Select an organization"
        }
        className="pl-4 field-input"
      />

      <ComboboxButton className="absolute top-1/2 -translate-y-1/2 right-4">
        {({ open }) => <DrawerIcon isOpen={open} size={20} />}
      </ComboboxButton>

      <Options searchText={searchText} />
    </Combobox>
  );
}
