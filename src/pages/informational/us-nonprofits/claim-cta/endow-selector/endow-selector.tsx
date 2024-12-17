import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import { forwardRef, useState } from "react";
import type { EndowmentOption } from "types/aws";
import { Options } from "./options";

interface Props {
  disabled?: boolean;
  value: EndowmentOption;
  onChange: (endowment: EndowmentOption) => void;
  error?: string;
}

type El = HTMLInputElement;

export const EndowSelector = forwardRef<El, Props>((props: Props, ref) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(searchText, 500);

  return (
    <Combobox
      disabled={props.disabled}
      value={props.value}
      onChange={(val) => val && props.onChange(val)}
      as="div"
      by="name"
      className="relative items-center flex w-full field-container min-h-[3rem] bg-white dark:bg-blue-d6"
    >
      <ComboboxInput
        ref={ref}
        placeholder="Search for an organization..."
        onChange={(event) => setSearchText(event.target.value)}
        displayValue={(value: EndowmentOption) => value.name}
        className="pl-4 w-full"
      />

      <ComboboxButton>
        {({ open }) => (
          <DrawerIcon isOpen={open} size={20} className="ml-auto mr-1" />
        )}
      </ComboboxButton>

      <Options searchText={debouncedQuery} isDebouncing={isDebouncing} />
      {props.error && (
        <span className="field-error" data-error>
          {props.error}
        </span>
      )}
    </Combobox>
  );
});
