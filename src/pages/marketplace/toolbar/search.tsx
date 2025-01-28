import { useFetcher, useSearchParams } from "@remix-run/react";
import debounce from "lodash/debounce";
import { SearchIcon } from "lucide-react";
import type { ChangeEventHandler } from "react";
import type { EndowCardsPage } from "types/aws";

export default function Search({ classes = "" }: { classes?: string }) {
  const [params] = useSearchParams();
  const { load } = useFetcher<EndowCardsPage>({
    key: "marketplace",
  }); //initially undefined
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const n = new URLSearchParams(params);
    n.set("query", e.target.value);
    load(`?${n.toString()}`);
  };

  return (
    <div
      className={`${classes} flex gap-2 items-center border border-gray-l4 rounded-lg relative`}
    >
      <SearchIcon
        size={20}
        className="absolute origin-center left-3 top-1/2 -translate-y-1/2"
      />
      <input
        type="search"
        name="query"
        onChange={debounce(onChange, 500)}
        className="w-full h-full p-3 pl-10 placeholder:text-gray text-gray-d4 font-medium font-heading rounded-lg outline-blue-d1 outline-offset-4"
        placeholder={"Search organizations..."}
      />
    </div>
  );
}
