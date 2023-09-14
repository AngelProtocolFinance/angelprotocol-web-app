import { Combobox as HuiCombobox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";
import { EndowmentOption } from "types/aws";
import { useEndowmentOptionsQuery } from "services/aws/aws";
import { DrawerIcon } from "components/Icon";
import QueryLoader from "components/QueryLoader";
import useDebouncer from "hooks/useDebouncer";
import { unsdgs } from "constants/unsdgs";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller";

export default function EndowmentSelector() {
  const {
    formState: { errors, isSubmitting, defaultValues },
  } = useFormContext<FV>();

  const {
    field: { value: endowment, onChange: onEndowmentChange, ref },
  } = useController<Pick<FV, "endowment">>({
    name: "endowment",
  });

  const [query, setQuery] = useState(defaultValues?.endowment?.name ?? "");
  const [debouncedQuery] = useDebouncer(query, 500);

  const queryState = useEndowmentOptionsQuery({
    query: debouncedQuery || "matchall",
    sort: "default",
    endow_types: "charity",
    tiers: "2,3",
    sdgs: Object.keys(unsdgs).join(","),
    kyc_only: "true,false",
    page: 1,
    published: "true",
  });

  return (
    <HuiCombobox
      aria-disabled={isSubmitting}
      value={endowment}
      onChange={onEndowmentChange}
      as="div"
      className="relative items-center grid grid-cols-[1fr_auto] w-full field-container min-h-[3rem]"
    >
      <HuiCombobox.Input
        ref={ref}
        placeholder="Select an endowment..."
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(value: EndowmentOption) => value.name}
        className="pl-4"
      />

      <HuiCombobox.Button>
        {({ open }) => <DrawerIcon isOpen={open} size={25} className="mx-1" />}
      </HuiCombobox.Button>

      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "loading options..",
          error: "failed to get endowments",
          empty: debouncedQuery
            ? `${debouncedQuery} not found`
            : "no options found",
        }}
        classes={{ container: containerStyle + " p-2" }}
      >
        {(endowments) => (
          <HuiCombobox.Options
            className={containerStyle}
            style={{ height: endowments.length <= 10 ? "auto" : "10rem" }}
          >
            {(endowments.length > 0 &&
              endowments.map((endowment) => (
                <HuiCombobox.Option
                  as={React.Fragment}
                  key={endowment.name}
                  value={endowment}
                >
                  {({ active }) => (
                    <li
                      className={`${
                        active ? "bg-blue-l2 dark:bg-blue-d1" : ""
                      } cursor-pointer flex gap-2 p-2 text-sm`}
                    >
                      <span>{endowment.name}</span>
                    </li>
                  )}
                </HuiCombobox.Option>
              ))) || (
              <div className="p-2 text-sm">{debouncedQuery} not found</div>
            )}
          </HuiCombobox.Options>
        )}
      </QueryLoader>

      <ErrorMessage errors={errors} name="endowment.name" as="span" />
    </HuiCombobox>
  );
}
