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

  private extract_blank_exists(key: string, csv: string): string[] {
    const vals = csv.split(",");
    const blank_idx = vals.findIndex((x) => x === "blank");
    const exists_idx = vals.findIndex((x) => x === "exists");

    if (blank_idx !== -1 && exists_idx !== -1) {
      vals.splice(blank_idx, 1);
      vals.splice(exists_idx, 1);
      return vals;
    }

    if (blank_idx !== -1) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [key]: { $exists: false } });
      vals.splice(blank_idx, 1);
    }
    if (exists_idx !== -1) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [key]: { $exists: true } });
      vals.splice(exists_idx, 1);
    }
    return vals;
  }

  set_opts(key: string, csv: string) {
    const opts = this.extract_blank_exists(key, csv);
    if (opts.length > 0) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [key]: { $in: opts } });
    }
  }
  set_texts(key: string, csv: string) {
    const texts = this.extract_blank_exists(key, csv);
    const distinct = Array.from(new Set(texts).values());
    if (distinct.length > 0) {
      this.filter.$and ||= [];
      this.filter.$and.push({
        $and: distinct.map((t) => ({ [key]: { $regex: t, $options: "i" } })),
      });
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
    classification_code = "",
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
  if (classification_code)
    filter.set_texts("classification_code", classification_code);

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
