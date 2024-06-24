import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { DrawerIcon } from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { EndowmentOption } from "types/aws";
import type { FormValues as FV } from "../types";
import Options from "./Options";

export default function EndowmentSelector() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FV>();

  const {
    field: { value: endowment, onChange: onEndowmentChange, ref },
  } = useController<FV, "endowment">({
    name: "endowment",
  });

  const [searchText, setSearchText] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(searchText, 500);

  return (
    <Combobox
      disabled={isSubmitting}
      value={endowment}
      onChange={(val) => val && onEndowmentChange(val)}
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
          <DrawerIcon isOpen={open} size={25} className="ml-auto mr-1" />
        )}
      </ComboboxButton>

      <Options searchText={debouncedQuery} isDebouncing={isDebouncing} />
      <ErrorMessage
        data-error
        errors={errors}
        name="endowment.id"
        as="span"
        className="field-error"
      />
    </Combobox>
  );
}
