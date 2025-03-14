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

  set_opts(key: string, csv: string) {
    // const conds: any = [];
    const opts = csv.split(",");
    const blank_idx = opts.findIndex((x) => x === "blank");
    const non_blank_idx = opts.findIndex((x) => x === "exist");
    if (blank_idx !== -1) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [key]: { $exists: false } });
      opts.splice(blank_idx, 1);
    }
    if (non_blank_idx !== -1) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [key]: { $exists: true } });
      opts.splice(non_blank_idx, 1);
    }
    if (opts.length > 0) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [key]: { $in: opts } });
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
    website_url = "",
    state = "",
    country = "",
    subsection_code = "",
    affilation_code = "",
    deductibility_code = "",
    deductibility_code_pub78 = "",
    ntee_code = "",
  } = Object.fromEntries(url.searchParams.entries());

  const filter = new Filter();
  if (asset_code) filter.set_opts("asset_code", asset_code);
  if (income_code) filter.set_opts("income_code", income_code);
  if (website_url) filter.set_opts("website_url", website_url);
  if (state) filter.set_opts("state", state);
  if (country) filter.set_opts("country", country);
  if (subsection_code) filter.set_opts("subsection_code", subsection_code);
  if (affilation_code) filter.set_opts("affilation_code", affilation_code);
  if (deductibility_code)
    filter.set_opts("deductibility_code", deductibility_code);
  if (deductibility_code_pub78)
    filter.set_opts("deductibility_code_pub78", deductibility_code_pub78);
  if (ntee_code) filter.set_opts("ntee_code", ntee_code);

  const skip = (+page - 1) * +limit;

  const collection = await nonprofits;
  const items = await collection
    .find(filter.all)
    .sort({ asset_amount: -1 })
    .skip(skip)
    .limit(+limit)
    .toArray();
  const count = await collection.countDocuments(filter.all);

  return {
    items,
    page: +page,
    size: +limit,
    num_items: count,
  } satisfies LoaderData;
};
