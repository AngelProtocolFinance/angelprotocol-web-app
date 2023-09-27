import { Combobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FV } from "../types";
import { EndowmentOption } from "types/aws";
import { DrawerIcon } from "components/Icon";
import useDebouncer from "hooks/useDebouncer";
import EndowmentOptions from "./EndowmentOptions";

export default function EndowmentSelector() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FV>();

  const {
    field: { value: endowment, onChange: onEndowmentChange, ref },
  } = useController<Pick<FV, "beneficiaryEndowment">>({
    name: "beneficiaryEndowment",
  });

  const [searchText, setSearchText] = useState("");
  const [debouncedQuery, isDebouncing] = useDebouncer(searchText, 500);

  return (
    <Combobox
      aria-disabled={isSubmitting}
      value={endowment}
      onChange={onEndowmentChange}
      as="div"
      by="name"
      className="relative items-center flex w-full field-container min-h-[3rem]"
    >
      <Combobox.Input
        ref={ref}
        placeholder="Select an endowment..."
        onChange={(event) => setSearchText(event.target.value)}
        displayValue={(value: EndowmentOption) => value.name}
        className="pl-4 w-full"
      />

      <Combobox.Button>
        {({ open }) => (
          <DrawerIcon isOpen={open} size={25} className="ml-auto mr-1" />
        )}
      </Combobox.Button>

      <EndowmentOptions
        searchText={debouncedQuery}
        isDebouncing={isDebouncing}
      />
      <ErrorMessage errors={errors} name="endowment.name" as="span" />
    </Combobox>
  );
}
