import type { INposPage } from "@better-giving/endowment";
import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import Image from "components/image";
import QueryLoader from "components/query-loader";
import useDebouncer from "hooks/use-debouncer";
import useSWR from "swr/immutable";

type Props = {
  searchText: string;
};

const fields = ["id", "name", "card_img", "registration_number"] as const;
type Field = (typeof fields)[number];

const fetcher = async (path: string) =>
  fetch(path).then<INposPage<Field>>((res) => res.json());

export function Options({ searchText }: Props) {
  const [debouncedSearchText, isDebouncing] = useDebouncer(searchText, 200);

  const params = {
    query: debouncedSearchText,
    page: "1",
    claimed: "false",
    fields: fields.join(","),
  };
  const endows = useSWR(
    `/api/npos?${new URLSearchParams(params).toString()}`,
    fetcher
  );

  return (
    <ComboboxOptions
      anchor="bottom"
      className="w-[var(--input-width)] mt-2 z-10 bg-white dark:bg-blue-d6 shadow-lg rounded-lg overflow-y-scroll max-h-24"
    >
      <QueryLoader
        queryState={{
          isLoading: endows.isLoading || isDebouncing,
          isFetching: endows.isValidating,
          isError: !!endows.error,
          data: endows.data?.items,
        }}
        messages={{
          loading: searchText ? "searching..." : "loading nonprofit...",
          error: "failed to get nonprofits",
          empty: searchText
            ? `${searchText} not found or already claimed`
            : "not found or already claimed",
        }}
        classes={{ container: "w-full p-2 text-gray" }}
      >
        {(endowments) => (
          <>
            {endowments.map((endowment) => (
              <ComboboxOption
                className="data-[selected]:bg-blue-l2 hover:bg-blue-l2 cursor-pointer flex gap-2 p-2"
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
