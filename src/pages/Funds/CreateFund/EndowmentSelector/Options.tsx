import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import useDebouncer from "hooks/useDebouncer";
import { useEndowmentCardsQuery } from "services/aws/aws";

interface Props {
  searchText: string;
  classes?: string;
}

export function Options({ classes = "", searchText }: Props) {
  const [debouncedSearchText] = useDebouncer(searchText, 200);

  const endowments = useEndowmentCardsQuery(
    debouncedSearchText
      ? {
          query: debouncedSearchText,
          page: 1,
          fund_opt_in: "true",
        }
      : {
          query: debouncedSearchText,
          page: 1,
        }
  );

  if (endowments.isLoading) {
    return (
      <ComboboxOptions className={classes}>Loading options..</ComboboxOptions>
    );
  }

  if (endowments.isError) {
    return (
      <ComboboxOptions className={classes}>
        Failed to load endowments
      </ComboboxOptions>
    );
  }

  const endows = endowments.data?.Items;
  if (!endows) return null;

  if (endows.length === 0) {
    return (
      <ComboboxOptions className={classes}>No endowments found</ComboboxOptions>
    );
  }

  return (
    <ComboboxOptions className={classes}>
      {endows.map((o) => (
        <ComboboxOption
          key={o.id}
          value={o}
          className="p-2 data-[selected]:text-blue-d1 hover:bg-blue-l4"
        >
          {o.name}
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );
}
