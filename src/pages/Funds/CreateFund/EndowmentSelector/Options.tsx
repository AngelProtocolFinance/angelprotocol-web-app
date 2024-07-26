import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import useDebouncer from "hooks/useDebouncer";
import { useEndowmentCardsQuery } from "services/aws/aws";

interface Props {
  searchText: string;
}

export function Options(props: Props) {
  const [debouncedSearchText, isDebouncing] = useDebouncer(
    props.searchText,
    200
  );

  const endowments = useEndowmentCardsQuery(
    {
      query: debouncedSearchText,
      page: 1,
    },
    { skip: isDebouncing }
  );

  if (endowments.isLoading) {
    return (
      <ComboboxOptions anchor="bottom start">Loading options..</ComboboxOptions>
    );
  }

  if (endowments.isError) {
    return (
      <ComboboxOptions anchor="bottom start">
        Failed to load endowments
      </ComboboxOptions>
    );
  }

  const endows = endowments.data?.Items;

  if (!endows || endows.length === 0) {
    return (
      <ComboboxOptions anchor="bottom start">
        No endowments found
      </ComboboxOptions>
    );
  }

  return (
    <ComboboxOptions anchor="bottom start" className="">
      {endows.map((o) => (
        <ComboboxOption key={o.id} value={o} className="">
          {o.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );
}
