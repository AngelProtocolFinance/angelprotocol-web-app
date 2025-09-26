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
      this.filter.$and.push({ [key]: { $exists: true, $not: { $size: 0 } } });
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
  range<T extends string>(
    kv: { [key in T]: T },
    wrapper: (...args: any[]) => any = (x) => x
  ) {
    const [[k, v]] = Object.entries(kv);
    if (!v) return;
    const range = this.extract_blank_exists(k, v as string);
    if (range.length > 1) {
      this.filter.$and ||= [];
      this.filter.$and.push({
        [k]: { $gte: wrapper(range[0]), $lte: wrapper(range[1]) },
      });
    }
  }

  get all() {
    return this.filter;
  }
}

export const npos_search = (request: Request) => {
  const url = new URL(request.url);
  const {
    last_updated = "",
    page = "1",
    limit = "10",
    sort = "last_updated+desc",
    asset_code,
    income_code,
    website,
    contacts,
    social_media,
    donation_platform,
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
    income_amount,
    asset_amount,
    revenue_amount,
    sort_name,
  } = Object.fromEntries(url.searchParams.entries());

  const filter = new Filter();
  filter.opts({ asset_code });
  filter.opts({ income_code });
  filter.opts({ website });
  filter.opts({ contacts });
  filter.opts({ social_media });
  filter.opts({ donation_platform });
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
  filter.opts({ sort_name });
  filter.starts_with({ ntee_code });
  filter.range({ income_amount }, Number);
  filter.range({ asset_amount }, Number);
  filter.range({ revenue_amount }, Number);
  filter.range({ last_updated }, (x) => new Date(x));

  return { filter: filter.all, page: +page, limit: +limit, sort: sort };
};
