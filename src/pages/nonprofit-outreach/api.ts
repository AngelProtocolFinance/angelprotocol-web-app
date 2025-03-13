import type { LoaderFunction } from "@vercel/remix";
import type { NonprofitItem } from "types/mongodb/nonprofits";
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

class Filter {
  filter: any = {};

  with_blank(key: string, csv: string) {
    // const conds: any = [];
    const codes = csv.split(",");
    const blank = codes.findIndex((x) => x === "blank");
    if (blank !== -1) {
      this.filter.$or ||= [];
      this.filter.$or.push({ [key]: { $exists: false } });
      codes.splice(blank, 1);
    }
    if (codes.length > 0) {
      // conds.push({ [key]: { $in: codes } });
      this.filter.$or ||= [];
      this.filter.$or.push({ [key]: { $in: codes } });
    }
  }

  get all() {
    return this.filter;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const {
    page = "1",
    limit = "10",
    asset_code = "",
    income_code = "",
  } = Object.fromEntries(url.searchParams.entries());

  const filter = new Filter();
  if (asset_code) filter.with_blank("asset_code", asset_code);
  if (income_code) filter.with_blank("income_code", income_code);

  const skip = (+page - 1) * +limit;

  const items = await nonprofits
    .find(filter.all)
    .sort({ asset_amount: -1 })
    .skip(skip)
    .limit(+limit)
    .toArray();

  return {
    items,
    page: +page,
    size: +limit,
    num_items: items.length,
  } satisfies LoaderData;
};
