import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { FocusableInput } from "components/Selector";
import { forwardRef, useState } from "react";
import { Options } from "./Options";
import type { Chain } from "./types";

interface Props {
  value: Chain;
  onChange: (chain: Chain) => void;
  disabled?: boolean;
  error?: string;
}

export const ChainSelector = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const [searchText, setSearchText] = useState("");

    return (
      <Combobox
        disabled={props.disabled}
        value={props.value}
        onChange={(x) => x && props.onChange(x)}
        as="div"
        by="name"
        className="relative items-center flex w-full field-container field-container-donate min-h-[3rem] bg-white dark:bg-blue-d6"
      >
        <FocusableInput ref={ref} />
        <ComboboxInput
          placeholder="Search network"
          onChange={(event) => setSearchText(event.target.value)}
          displayValue={(value: Chain) => value.name}
          className="field-input-donate"
        />

        <ComboboxButton className="absolute inset-y-0 right-5">
          {({ open }) => <DrawerIcon isOpen={open} size={25} />}
        </ComboboxButton>

        <Options searchText={searchText} />
        {props.error && (
          <p className="field-error" data-error>
            {props.error}
          </p>
        )}
      </Combobox>
    );
  }
);
