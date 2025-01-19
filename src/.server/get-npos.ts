import type {
  EndowItem,
  EndowsPage,
  EndowsQueryParamsParsed,
  UnSdgNum,
} from "@better-giving/endowment";
import type * as cs from "@better-giving/endowment/cloudsearch";
import type { ToDoc } from "@better-giving/types/cloudsearch";
import type { Ensure } from "@better-giving/types/utils";
import { cloudsearchSearchEndpoint, env } from "./env";

type EndowHit = ToDoc<cs.CloudsearchEndow>;
type Endow = Ensure<Partial<cs.CloudsearchEndow>, "contributions_total">;
const HITS_PER_PAGE = 20;

export const cacheControl =
  "public, max-age=0, s-max-age=30, stale-while-revalidate=60";

export async function getNpos(
  params: EndowsQueryParamsParsed
): Promise<EndowsPage> {
  const { fields, query: q, page = 1, ...p } = params;

  const filters = {
    env: `env:'${env}'`,
    published: `published:1`,
    country: component(
      p.countries,
      (v) => `hq_country:'${v}' active_in_countries:'${v}'`
    ),
    designation: component(
      p.endow_designation,
      (v) => `endow_designation:'${v}'`
    ),
    kyc: component(p.kyc_only, (v) => `kyc_donors_only:${v ? 1 : 0}`),
    fund: component(p.fund_opt_in, (v) => `fund_opt_in:${v ? 1 : 0}`),
    sdgs: component(p.sdgs, (v) => `sdgs:${v}`),
    claimed: component(p.claimed, (v) => `claimed:${v ? 1 : 0}`),
  };

  const filterQuery = `(and ${Object.values(filters)
    .filter(Boolean)
    .join(" ")})`;

  const queryString = (() => {
    if (!q || q === "") return "matchall";
    // Escape single quotes in the query string
    const safeQ = q.replace(/'/g, "\\'");
    if (safeQ.length <= 2) return `(or name:'${safeQ}' tagline:'${safeQ}')`;
    return `(or (prefix field=name '${safeQ}') (prefix field=tagline '${safeQ}') name:'${safeQ}' tagline:'${safeQ}' registration_number:'${safeQ}')`;
  })();

  const startAt = (page - 1) * HITS_PER_PAGE;

  // Construct search parameters
  const endpoint = new URL(cloudsearchSearchEndpoint);
  endpoint.pathname = "/2013-01-01/search";
  endpoint.searchParams.set("q", queryString);
  endpoint.searchParams.set("q.parser", "structured");
  endpoint.searchParams.set("fq", filterQuery);
  endpoint.searchParams.set("sort", "claimed desc, name asc");
  endpoint.searchParams.set("size", HITS_PER_PAGE.toString());
  endpoint.searchParams.set("start", startAt.toString());
  if (fields?.length) {
    endpoint.searchParams.set("return", fields.join(","));
  }

  const res = await fetch(endpoint);
  if (!res.ok) throw res;

  const result = await res.json();
  const hits = result.hits?.hit || [];
  const found = result.hits?.found;

  if (hits.length === 0 && !found) {
    return {
      items: [],
      page: 1,
      numPages: 1,
    };
  }

  return {
    items: hits.map((hit: any) => processFields(hit.fields)),
    page,
    numPages: Math.ceil((found ?? 1) / HITS_PER_PAGE),
  };
}

const component = <T extends string | number | boolean>(
  vals: T[] | undefined,
  expression: (value: T) => string
): string | null => {
  if (!vals || vals.length === 0) return null;

  if (vals.length === 1) {
    return `${expression(vals[0])}`;
  }
  return `(or ${vals.map((v) => `${expression(v)}`).join(" ")})`;
};

const processFields = (f: EndowHit): EndowItem => {
  const kv = kvFn(f);
  const endow: Endow = {
    ...kv("card_img", (v) => v),
    ...kv("name", (v) => v),
    ...kv("tagline", (v) => v),
    ...kv("hq_country", (v) => v),
    ...kv("sdgs", (v) => v.map((s) => Number.parseInt(s, 10)) as UnSdgNum[]),
    ...kv("active_in_countries", (v) => v),
    ...kv("endow_designation", (v) => v),
    ...kv("registration_number", (v) => v),
    ...kv("kyc_donors_only", (v) => v === "1"),
    ...kv("claimed", (v) => v === "1"),
    ...kv("env", (v) => v),
    ...kv("id", (v) => Number.parseInt(v, 10)),
    ...kv("published", (v) => v === "1"),
    ...kv("fund_opt_in", (v) => v === "1"),
    ...kv("contributions_count", (v) => Number.parseInt(v, 10)),
    ...kv("target", (v) => v),
    contributions_total: Number.parseInt(f.contributions_total?.[0] ?? "0", 10),
  };
  return endow as EndowItem;
};

const kvFn =
  <From extends EndowHit, To extends Endow>(from: From) =>
  <Kto extends keyof Endow>(
    key: Kto,
    value: (v: NonNullable<From[Kto]>) => To[Kto]
  ) =>
    from[key] && { [key]: value(from[key]) };
