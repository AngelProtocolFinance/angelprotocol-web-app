import { Combobox } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
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
        onChange={props.onChange}
        as="div"
        by="name"
        className="relative items-center flex w-full field-container field-container-donate min-h-[3rem] bg-white dark:bg-blue-d6"
      >
        <Combobox.Input
          ref={ref}
          placeholder="Search network"
          onChange={(event) => setSearchText(event.target.value)}
          displayValue={(value: Chain) => value.name}
          className="field-input-donate"
        />

        <Combobox.Button>
          {({ open }) => (
            <DrawerIcon isOpen={open} size={25} className="ml-auto mr-5" />
          )}
        </Combobox.Button>

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
