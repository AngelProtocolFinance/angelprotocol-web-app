import { Combobox } from "@headlessui/react";
import QueryLoader from "components/QueryLoader";
import { unsdgs } from "constants/unsdgs";
import { Fragment } from "react";
import { useEndowmentOptionsQuery } from "services/aws/aws";

type Props = {
  searchText: string;
  isDebouncing?: boolean;
};

export default function Options({ searchText, isDebouncing = false }: Props) {
  const queryState = useEndowmentOptionsQuery({
    query: searchText,
    sdgs: Object.keys(unsdgs).join(","),
    kyc_only: "true,false",
    page: 1,
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
          error: "failed to get nonprofits",
          empty: searchText ? `${searchText} not found` : "no options found",
        }}
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
