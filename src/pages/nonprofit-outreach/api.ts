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
      this.filter.$or ||= [];
      this.filter.$or.push({ [key]: { $exists: false } });
      opts.splice(blank_idx, 1);
    }
    if (non_blank_idx !== -1) {
      this.filter.$or ||= [];
      this.filter.$or.push({ [key]: { $exists: true } });
      opts.splice(non_blank_idx, 1);
    }
    if (opts.length > 0) {
      this.filter.$or ||= [];
      this.filter.$or.push({ [key]: { $in: opts } });
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
  } = Object.fromEntries(url.searchParams.entries());

  const filter = new Filter();
  if (asset_code) filter.set_opts("asset_code", asset_code);
  if (income_code) filter.set_opts("income_code", income_code);
  if (website_url) filter.set_opts("website_url", website_url);
  if (state) filter.set_opts("state", state);
  if (country) filter.set_opts("mailing_address.country", country);

  const skip = (+page - 1) * +limit;

  const items = await nonprofits
    .find(filter.all)
    .sort({ asset_amount: -1 })
    .skip(skip)
    .limit(+limit)
    .toArray();
  const count = await nonprofits.countDocuments(filter.all);

  return {
    items,
    page: +page,
    size: +limit,
    num_items: count,
  } satisfies LoaderData;
};
