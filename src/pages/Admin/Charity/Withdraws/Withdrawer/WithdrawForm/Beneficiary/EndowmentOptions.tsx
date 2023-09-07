import { Combobox } from "@headlessui/react";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { FV } from "../types";
import { EndowmentType } from "types/lists";
import { useEndowmentSelectorOptionsQuery } from "services/aws/aws";
import QueryLoader from "components/QueryLoader";
import { unsdgs } from "constants/unsdgs";

type Props = {
  searchText: string;
  isDebouncing?: boolean;
};

export default function EndowmentOptions({
  searchText,
  isDebouncing = false,
}: Props) {
  const { getValues } = useFormContext<FV>();
  const endowId = getValues("endowId");
  const endowType = getValues("endowType");
  const endowTypes: EndowmentType[] =
    endowType === "charity" ? ["charity"] : ["charity", "ast"];

  const queryState = useEndowmentSelectorOptionsQuery({
    query: searchText || "matchall",
    sort: "default",
    endow_types: endowTypes.join(","),
    tiers: "2,3",
    sdgs: Object.keys(unsdgs).join(","),
    kyc_only: "true,false",
    page: 1,
    published: "true,false",
  });

  return (
    <Combobox.Options className="absolute left-0 top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller">
      <QueryLoader
        queryState={{
          ...queryState,
          isLoading: queryState.isLoading || isDebouncing,
        }}
        messages={{
          loading: "loading options..",
          error: "failed to get endowments",
          empty: searchText ? `${searchText} not found` : "no options found",
        }}
        //avoid transferring to own endowment
        filterFn={(option) => option.id !== endowId}
        classes={{ container: "w-full text-sm p-2" }}
      >
        {(endowments) => (
          <>
            {endowments.map((endowment) => (
              <Combobox.Option
                as={Fragment}
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
              </Combobox.Option>
            ))}
          </>
        )}
      </QueryLoader>
    </Combobox.Options>
  );
}
