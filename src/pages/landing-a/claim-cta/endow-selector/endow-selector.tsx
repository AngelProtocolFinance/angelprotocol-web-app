import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { DrawerIcon } from "components/icon";
import { SearchIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import type { EndowmentOption } from "types/npo";
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

  return (
    <Combobox
      disabled={props.disabled}
      value={props.value}
      onChange={(val) => val && props.onChange(val)}
      as="div"
      by="name"
      className="relative bg-white dark:bg-blue-d6 rounded-full"
    >
      <SearchIcon
        className="absolute top-1/2 -translate-y-1/2 left-4"
        size={16}
      />
      <ComboboxInput
        ref={ref}
        id="claim-npo-input"
        placeholder="Search by name or EIN"
        onChange={(event) => setSearchText(event.target.value)}
        displayValue={(value: EndowmentOption) => value.name}
        className="px-10 w-full focus:outline-none p-3 rounded-full"
      />

      <ComboboxButton>
        {({ open }) => (
          <DrawerIcon
            isOpen={open}
            size={16}
            className="absolute top-1/2 -translate-y-1/2 right-4"
          />
        )}
      </ComboboxButton>

      <Options searchText={searchText} />
      {props.error && (
        <span className="field-error" data-error>
          {props.error}
        </span>
      )}
    </Combobox>
  );
});
