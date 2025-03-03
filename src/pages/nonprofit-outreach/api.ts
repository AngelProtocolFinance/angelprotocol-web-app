import type { LoaderFunction } from "@vercel/remix";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import * as v from "valibot";
import { nonprofits } from ".server/mongodb/db";

interface Stats {
  assets: { min: number | null; max: number | null };
  income: { min: number | null; max: number | null };
  revenue: { min: number | null; max: number | null };
}

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  size: number;
  num_items: number;
  stats?: Stats;
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
  const items = await nonprofits
    .find({})
    .sort({ assets: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const [agg] = await nonprofits
    .aggregate([
      {
        $group: {
          _id: null,
          mina: { $min: "$assets" },
          maxa: { $max: "$assets" },
          mini: { $min: "$income" },
          maxi: { $max: "$income" },
          minr: { $min: "$revenue" },
          maxr: { $max: "$revenue" },
        },
      },
    ])
    .toArray();

  const stats = agg
    ? {
        assets: { min: agg.mina, max: agg.maxa },
        income: { min: agg.mini, max: agg.maxi },
        revenue: { min: agg.minr, max: agg.maxr },
      }
    : undefined;
  return {
    items,
    page,
    size: limit,
    num_items: all,
    stats,
  } satisfies LoaderData;
};
