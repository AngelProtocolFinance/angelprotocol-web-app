import type { LoaderFunction } from "@vercel/remix";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  pages: number;
}

const limit = 2;
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;

  const all = await nonprofits.countDocuments({});
  const pages = Math.ceil(all / limit);
  const items = await nonprofits
    .find({})
    .sort({ assets: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    items,
    page,
    pages,
  } satisfies LoaderData;
};
