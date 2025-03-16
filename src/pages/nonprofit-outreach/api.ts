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

  opts<T extends string>(kv: { [key in T]: T }) {
    const [[k, v]] = Object.entries(kv);
    if (!v) return;
    const opts = this.extract_blank_exists(k, v as string);
    if (opts.length > 0) {
      this.filter.$and ||= [];
      this.filter.$and.push({ [k]: { $in: opts } });
    }
  }
  texts<T extends string>(kv: { [key in T]: T }) {
    const [[k, v]] = Object.entries(kv);
    if (!v) return;
    const texts = this.extract_blank_exists(k, v as string);
    const distinct = Array.from(new Set(texts).values());
    if (distinct.length > 0) {
      this.filter.$and ||= [];
      this.filter.$and.push({
        $and: distinct.map((t) => ({ [k]: { $regex: t, $options: "i" } })),
      });
    }
  }
  starts_with<T extends string>(kv: { [key in T]: T }) {
    const [[k, v]] = Object.entries(kv);
    if (!v) return;
    const starts = this.extract_blank_exists(k, v as string);
    if (starts.length > 0) {
      this.filter.$and ||= [];
      this.filter.$and.push({
        $and: starts.map((t) => ({ [k]: { $regex: `^${t}`, $options: "i" } })),
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
    asset_code,
    income_code,
    website_url,
    state,
    country,
    subsection_code,
    affilation_code,
    deductibility_code,
    deductibility_code_pub78,
    ntee_code,
    classification_code,
    foundation_code,
    activity_code,
    exempt_organization_status_code,
    organization_code,
    filing_requirement_code,
  } = Object.fromEntries(url.searchParams.entries());

  const filter = new Filter();
  filter.opts({ asset_code });
  filter.opts({ income_code });
  filter.opts({ website_url });
  filter.opts({ state });
  filter.opts({ country });
  filter.opts({ subsection_code });
  filter.opts({ affilation_code });
  filter.opts({ deductibility_code });
  filter.opts({ deductibility_code_pub78 });
  filter.texts({ classification_code });
  filter.texts({ activity_code });
  filter.opts({ foundation_code });
  filter.opts({ organization_code });
  filter.opts({ exempt_organization_status_code });
  filter.opts({ filing_requirement_code });
  filter.starts_with({ ntee_code });

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
