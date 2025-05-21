import {
  Link,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { Info } from "components/status";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import type { LoaderData } from "./api";
import { EarningsHistory } from "./table";
export { loader } from "./api";

export default function Page() {
  const page1 = useLoaderData<LoaderData>();
  const { data, state, load } = useFetcher<LoaderData>(); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(() => page1.items);

  useEffect(() => {
    setItems(page1.items);
  }, [page1.items]);

  useEffect(() => {
    if (!data || state === "loading") return;
    setItems((prev) => [...prev, ...(data.items || [])]);
  }, [data, state]);

  const nextKey = data ? data.nextKey : page1.nextKey;

  function loadNext(key: string) {
    const n = new URLSearchParams(params);
    n.set("nextKey", key.toString());
    load(`?${n.toString()}`);
  }

  return (
    <div>
      <Link
        to="../referrals"
        className="flex items-center gap-1s text-blue-d1 hover:text-blue text-sm -ml-2 mb-2"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      <EarningsHistory
        emptyEl={<Info classes="mt-2">No donations found</Info>}
        items={items}
        onViewMore={nextKey ? () => loadNext(nextKey) : undefined}
      />
    </div>
  );
}
