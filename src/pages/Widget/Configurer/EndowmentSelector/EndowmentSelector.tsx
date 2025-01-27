import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { useSearchParams } from "@remix-run/react";
import { DrawerIcon } from "components/icon";
import debounce from "lodash/debounce";
import { useState } from "react";
import type { EndowmentOption } from "types/aws";
import Options from "./Options";

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
      className="relative items-center flex w-full field-container min-h-[3rem] bg-white dark:bg-blue-d6"
    >
      <ComboboxInput
        placeholder="Search for an organization..."
        onChange={debounce(handleSearchTextChange, 500)}
        displayValue={(value?: EndowmentOption) =>
          value?.name ?? "Select an organization"
        }
        className="pl-4 w-full"
      />

      <ComboboxButton>
        {({ open }) => (
          <DrawerIcon isOpen={open} size={20} className="ml-auto mr-1" />
        )}
      </ComboboxButton>

      <Options searchText={searchText} />
    </Combobox>
  );
}
