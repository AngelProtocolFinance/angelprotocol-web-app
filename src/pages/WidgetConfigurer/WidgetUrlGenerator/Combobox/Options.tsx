import { Combobox } from "@headlessui/react";
import React from "react";
import { useEndowmentIdNamesQuery } from "services/aws/aws";
import QueryLoader from "components/QueryLoader";
import { unsdgs } from "constants/unsdgs";

const containerStyle =
  "absolute top-full mt-2 z-10 w-full bg-white dark:bg-blue-d6 shadow-lg rounded overflow-y-scroll scroller";

export default function Options({ query }: { query: string }) {
  const { data, isLoading, isError } = useEndowmentIdNamesQuery({
    query: query || "matchall",
    sort: "default",
    endow_types: "Charity",
    tiers: "Level2,Level3",
    sdgs: Object.keys(unsdgs).join(","),
    kyc_only: "true,false",
    start: 0,
  });

  return (
    <QueryLoader
      queryState={{
        data: data?.Items,
        isLoading,
        isError,
      }}
      messages={{
        loading: "loading options..",
        error: "failed to get country options",
        empty: query ? `${query} not found` : "no options found",
      }}
      classes={{ container: containerStyle + " p-2" }}
    >
      {(endowIdNames) => (
        <Combobox.Options
          className={containerStyle}
          style={{ height: endowIdNames.length <= 10 ? "auto" : "10rem" }}
        >
          {(endowIdNames.length > 0 &&
            endowIdNames.map((endowIdName) => (
              <Combobox.Option
                as={React.Fragment}
                key={endowIdName.name}
                value={endowIdName}
              >
                {({ active }) => (
                  <li
                    className={`${
                      active ? "bg-blue-l2 dark:bg-blue-d1" : ""
                    } cursor-pointer flex gap-2 p-2 text-sm`}
                  >
                    <span>{endowIdName.name}</span>
                  </li>
                )}
              </Combobox.Option>
            ))) || <div className="p-2 text-sm">{query} not found</div>}
        </Combobox.Options>
      )}
    </QueryLoader>
  );
}
