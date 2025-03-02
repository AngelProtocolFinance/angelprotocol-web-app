import type { LoaderFunction } from "@vercel/remix";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import * as v from "valibot";
import { nonprofits } from ".server/mongodb/db";

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  pages: number;
}

const plusInt = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.minValue(1)
);
export const queryParams = v.object({
  page: v.optional(plusInt, "1"),
  limit: v.optional(plusInt, "10"),
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const raw = Object.fromEntries(url.searchParams.entries());
  const { page, limit } = v.parse(queryParams, raw);
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
