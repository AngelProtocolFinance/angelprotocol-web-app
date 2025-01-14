import type { FundsPage } from "@better-giving/fundraiser";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import type { ChangeEventHandler } from "react";
import Cards from "./Cards";

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);
  const page = +(source.searchParams.get("page") ?? "1");
  const q = source.searchParams.get("query") ?? "";
  const s = new URLSearchParams(source.searchParams);
  s.set("page", page.toString());
  s.set("query", q);

  return ap
    .get(`${ver(1)}/funds`, {
      searchParams: s,
    })
    .json();
};

export default function Funds() {
  const page1 = useLoaderData<FundsPage>();
  const { load } = useFetcher<FundsPage>({ key: "funds" }); //initially undefined
  const [params] = useSearchParams();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const n = new URLSearchParams(params);
    n.set("query", e.target.value);
    load(`?index&${n.toString()}`);
  };

  return (
    <div className="padded-container mt-8 pb-8">
      <div
        className={`flex gap-2 items-center rounded-lg overflow-clip field-container`}
      >
        <Search size={20} className="ml-2" />
        <input
          type="search"
          name="query"
          onChange={debounce(onChange, 500)}
          className="w-full py-2 pr-3 placeholder:text-navy-l3 text-navy-d4 font-medium font-heading"
          placeholder="Search fundraiser"
        />
      </div>
      <Cards page1={page1} classes="mt-4" />
    </div>
  );
}
