import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import Image from "components/Image";
import QueryLoader from "components/QueryLoader";
import { useEndowmentOptionsQuery } from "services/aws/aws";

type Props = {
  searchText: string;
  isDebouncing?: boolean;
};

export function Options({ searchText, isDebouncing = false }: Props) {
  const queryState = useEndowmentOptionsQuery({
    page: "1",
    query: searchText,
    claimed: "false",
  });

  return (
    <ComboboxOptions
      anchor="bottom"
      className="w-[var(--input-width)] mt-2 z-10 bg-white dark:bg-blue-d6 shadow-lg rounded-lg overflow-y-scroll max-h-32"
    >
      <QueryLoader
        queryState={{
          ...queryState,
          isLoading: queryState.isLoading || isDebouncing,
        }}
        messages={{
          loading: searchText ? "searching..." : "loading nonprofit...",
          error: "failed to get nonprofits",
          empty: searchText
            ? `${searchText} not found or already claimed`
            : "not found or already claimed",
        }}
        classes={{ container: "w-full text-sm p-2 text-navy-l1" }}
      >
        {(endowments) => (
          <>
            {endowments.map((endowment) => (
              <ComboboxOption
                className="data-[selected]:bg-blue-l2 hover:bg-blue-l2 cursor-pointer flex gap-2 p-2 text-sm"
                key={endowment.name}
                value={endowment}
              >
                <Image
                  src={endowment.card_img}
                  width="10"
                  className="rounded-sm"
                />
                <span>{endowment.name}</span>
              </ComboboxOption>
            ))}
          </>
        )}
      </QueryLoader>
    </ComboboxOptions>
  );
}
