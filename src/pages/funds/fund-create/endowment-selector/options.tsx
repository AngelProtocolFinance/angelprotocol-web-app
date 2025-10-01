import type { INposSearch } from "@better-giving/endowment";
import { ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { Image } from "components/image";
import { ErrorStatus, Info, LoadingStatus } from "components/status";
import { use_debouncer } from "hooks/use-debouncer";
import useSWR from "swr/immutable";
import type { EndowFundMembersOptionsPage } from "types/npo";
import type { EndowOption } from "../schema";

interface Props {
  searchText: string;
  classes?: string;
}

const fetcher = async ({
  query = "",
  page = "1",
  fund_opt_in = "true",
}: INposSearch) => {
  const search = new URLSearchParams({
    query,
    page,
    fund_opt_in,
    fields: "id,name,card_img,registration_number",
  });
  const res = await fetch(`/api/npos?${search.toString()}`);
  if (!res.ok) throw res;
  return res.json() as Promise<EndowFundMembersOptionsPage>;
};

export function Options({ classes = "", searchText }: Props) {
  const [debouncedSearchText, isDebouncing] = use_debouncer(searchText, 200);

  const endowments = useSWR(
    { query: debouncedSearchText, page: "1", fund_opt_in: "true" },
    fetcher
  );

  if (endowments.isLoading || isDebouncing) {
    return (
      <LoadingStatus classes={`${classes} p-2`}>
        Loading options...
      </LoadingStatus>
    );
  }

  if (endowments.error) {
    return (
      <ErrorStatus classes={`${classes} p-2`}>
        Failed to load endowments
      </ErrorStatus>
    );
  }

  const endows = endowments.data?.items;
  if (!endows) return null;

  if (endows.length === 0) {
    return <Info classes={`${classes} p-2`}>No endowments found</Info>;
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
          <div>
            <span>{o.name}</span>{" "}
            <span className="text-xs text-gray-l1">
              {o.registration_number}
            </span>
          </div>
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );
}
