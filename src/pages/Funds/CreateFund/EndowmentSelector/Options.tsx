import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useEndowmentCardsQuery } from "services/aws/aws";

interface Props {
  searchText: string;
}

export function Options(props: Props) {
  const endowments = useEndowmentCardsQuery({
    query: props.searchText,
    page: 1,
  });

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
