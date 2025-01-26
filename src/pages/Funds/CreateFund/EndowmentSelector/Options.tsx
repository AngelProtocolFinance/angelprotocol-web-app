import type { EndowsQueryParams } from "@better-giving/endowment";
import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import Image from "components/Image";
import { ErrorStatus, Info, LoadingStatus } from "components/Status";
import useDebouncer from "hooks/useDebouncer";
import useSWR from "swr/immutable";
import type { EndowFundMembersOptionsPage } from "types/aws";
import type { EndowOption } from "../schema";

interface Props {
  searchText: string;
  classes?: string;
}

const fetcher = async ({
  query = "",
  page = "1",
  fund_opt_in = "true",
}: EndowsQueryParams) => {
  const search = new URLSearchParams({
    query,
    page,
    fund_opt_in,
    fields: "id,name,card_img",
  });
  const res = await fetch(`/api/npos?${search.toString()}`);

  if (!res.ok) throw res;
  return res.json() as Promise<EndowFundMembersOptionsPage>;
};

export function Options({ classes = "", searchText }: Props) {
  const [debouncedSearchText, isDebouncing] = useDebouncer(searchText, 200);

  const endowments = useSWR(
    { query: debouncedSearchText, page: "1", fund_opt_in: "true" },
    fetcher
  );

  if (endowments.isLoading || isDebouncing) {
    return (
      <LoadingStatus classes={classes + " p-2"}>
        Loading options...
      </LoadingStatus>
    );
  }

  if (endowments.error) {
    return (
      <ErrorStatus classes={classes + " p-2"}>
        Failed to load endowments
      </ErrorStatus>
    );
  }

  const endows = endowments.data?.items;
  if (!endows) return null;

  if (endows.length === 0) {
    return <Info classes={classes + " p-2"}>No endowments found</Info>;
  }

  return (
    <ComboboxOptions className={classes}>
      {endows.map((o) => (
        <ComboboxOption
          key={o.id}
          value={
            {
              logo: o.card_img,
              name: o.name,
              id: o.id,
            } satisfies EndowOption
          }
          className="flex gap-x-2 p-2 data-selected:text-blue-d1 data-selected:pointer-events-none hover:bg-blue-l4 select-none"
        >
          <Image src={o.card_img} className="w-8" />
          <span>{o.name}</span>
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );
}
