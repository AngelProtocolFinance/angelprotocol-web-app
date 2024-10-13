import Seo from "components/Seo";
import { APIs } from "constants/urls";
import {
  type LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { version as v } from "services/helpers";
import type { EndowListPaginatedAWSQueryRes, EndowmentCard } from "types/aws";
import ActiveFilters from "./ActiveFilters";
import Cards from "./Cards";
import Hero from "./Hero";
import Toolbar from "./Toolbar";

type Page = EndowListPaginatedAWSQueryRes<EndowmentCard[]>;

/**@param number - >= 2 */
function restPages(num: number) {
  const result = [];
  for (let i = num; i >= 2; i--) {
    result.push(i);
  }
  return result;
}

async function pageRes(
  search: URLSearchParams,
  page: number,
  cache: Cache
): Promise<Response | undefined> {
  const n = new URLSearchParams(search);
  n.set("page", page.toString());
  const url = new URL(APIs.aws);
  url.pathname = `${v(1)}/cloudsearch-nonprofits`;
  url.search = n.toString();
  const c = await cache.match(url);

  if (c) return c.clone();

  await cache.add(url);
  const fresh = await cache.match(url);
  if (fresh) return fresh.clone();
}

async function loadPages(request: Request): Promise<Page | Response> {
  const cache = await caches.open("bg");
  const source = new URL(request.url);
  // delete focus persistor from <Search/>
  source.searchParams.delete("_f");

  const pageNum = +(source.searchParams.get("page") ?? "1");

  const pagesRes: Response[] = [];
  const firstPageRes = await pageRes(source.searchParams, 1, cache);

  if (firstPageRes) pagesRes.push(firstPageRes.clone());

  const maxPage = await (async (r) => {
    if (!r) return 1;
    const c = r.clone();
    const p: Page = await c.json();
    return p.NumOfPages;
  })(firstPageRes);

  for (const page of restPages(Math.min(pageNum, maxPage)).reverse()) {
    const res = await pageRes(source.searchParams, page, cache);
    if (res) pagesRes.push(res);
  }

  if (pageNum > maxPage) {
    const to = new URL(source);
    to.searchParams.set("page", maxPage.toString());
    return redirect(to.toString());
  }

  const res = await Promise.all(pagesRes.map<Page>((r) => r.json() as any));

  return {
    NumOfPages: res[0].NumOfPages,
    Items: res.flatMap((r) => r.Items),
    Page: pageNum,
  };
}

export const loader: LoaderFunction = async ({ request }) => loadPages(request);

export function Component() {
  const page = useLoaderData() as Page;
  return (
    <div className="w-full grid content-start pb-16">
      <Seo title="Marketplace" />
      <div className="relative overlay bg-cover bg-left-top">
        <Hero classes="grid isolate mt-28 mb-16" />
      </div>

      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <Toolbar classes="mt-10" />
        <ActiveFilters />
        <Cards page={page} />
      </div>
      <Outlet />
    </div>
  );
}
