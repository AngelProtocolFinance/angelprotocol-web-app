import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import { chains } from "constants/chains";
import { forwardRef, useState } from "react";
import type { MaybeEmptyChainId } from "../types";
import { Options } from "./Options";

interface Props {
  value: MaybeEmptyChainId;
  onChange: (chain: MaybeEmptyChainId) => void;
  disabled?: boolean;
  error?: string;
}

export const ChainSelector = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const [searchText, setSearchText] = useState("");

    return (
      <Combobox
        disabled={props.disabled}
        immediate
        value={props.value}
        onChange={(x) => x && props.onChange(x)}
        as="div"
        className="relative items-center flex w-full field-container field-container-donate min-h-[3rem] bg-white dark:bg-blue-d6"
      >
        <ComboboxInput
          type="text"
          ref={ref}
          placeholder="Search network"
          onChange={(event) => setSearchText(event.target.value)}
          displayValue={(id: MaybeEmptyChainId) => (id ? chains[id].name : "")}
          className="field-input-donate"
        />

        <ComboboxButton className="absolute inset-y-0 right-5">
          {({ open }) => <DrawerIcon isOpen={open} size={20} />}
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
