import type { FundsPage } from "@better-giving/fundraiser";
import { fundsParams } from "@better-giving/fundraiser/schema";
import { useFetcher, useSearchParams } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { metas } from "helpers/seo";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import type { ChangeEventHandler } from "react";
import { safeParse } from "valibot";
import Cards from "./cards";
import { getFunds } from ".server/funds";

export { clientLoader } from "api/cache";
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

export const meta: MetaFunction = () =>
  metas({
    title: "Fundraisers",
    description: "Access our free fundraising technology and tools.",
  });

export { ErrorBoundary } from "components/error";
export default function Funds() {
  const page1 = useCachedLoaderData<FundsPage>();
  const { load } = useFetcher<FundsPage>({ key: "funds" }); //initially undefined
  const [params] = useSearchParams();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const n = new URLSearchParams(params);
    n.set("query", e.target.value);
    load(`?${n.toString()}`);
  };

  return (
    <div className="xl:container xl:mx-auto px-5 mt-8 pb-8">
      <div className="relative">
        <Search
          size={20}
          className="ml-2 absolute top-1/2 -translate-y-1/2 left-2"
        />
        <input
          type="search"
          name="query"
          onChange={debounce(onChange, 500)}
          className="field-input text-base rounded-lg h-full pl-12"
          placeholder="Search fundraiser"
        />
      </div>
      <Cards page1={page1} classes="mt-4" />
    </div>
  );
}
