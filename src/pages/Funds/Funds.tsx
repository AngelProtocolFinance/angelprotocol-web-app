import type { FundsPage } from "@better-giving/fundraiser";
import { fundsParams } from "@better-giving/fundraiser/schema";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import type { HeadersFunction, LoaderFunction } from "@vercel/remix";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import type { ChangeEventHandler } from "react";
import { safeParse } from "valibot";
import Cards from "./Cards";
import { cacheControl, getFunds } from ".server/funds";

export const headers: HeadersFunction = () => ({
  "Cache-Control": cacheControl,
});

export const loader: LoaderFunction = async ({ request }) => {
  const source = new URL(request.url);
  const params = safeParse(
    fundsParams,
    Object.fromEntries(source.searchParams)
  );
  if (params.issues) {
    return { status: 400, body: params.issues[0].message };
  }
  const page = await getFunds(params.output);
  return page;
};

export { ErrorBoundary } from "components/error";
export default function Funds() {
  const page1 = useLoaderData<FundsPage>();
  const { load } = useFetcher<FundsPage>({ key: "funds" }); //initially undefined
  const [params] = useSearchParams();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const n = new URLSearchParams(params);
    n.set("query", e.target.value);
    load(`?${n.toString()}`);
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
