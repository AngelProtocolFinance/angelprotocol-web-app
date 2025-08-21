import type {
  EndowsQueryParamsParsed,
  INposPage,
} from "@better-giving/endowment";
import { env, typesense_envs } from "./env";

const HITS_PER_PAGE = 20;

export async function getNpos(
  params: EndowsQueryParamsParsed
): Promise<INposPage> {
  const { fields, query: q, page = 1, ...p } = params;

  // Build filter conditions for Typesense
  const filter_by = buildFilterBy(p);
  // Build search query

  // Construct Typesense search request
  const search_params = new URLSearchParams({
    q: q || "*",
    query_by: "name,tagline,registration_number",
    query_by_weights: "3,2,1",
    filter_by,
    sort_by: q ? "_text_match:desc" : "claimed:desc,name:asc",
    per_page: HITS_PER_PAGE.toString(),
    page: page.toString(),
    use_cache: "true",
  });

  if (fields?.length) {
    search_params.set("include_fields", fields.join(","));
  }

  // Make request to Typesense
  const endpoint = new URL(typesense_envs.endpoint);
  endpoint.pathname = `/collections/npos/documents/search`;
  endpoint.search = search_params.toString();
  const h = new Headers();
  h.set("X-TYPESENSE-API-KEY", typesense_envs.api_key);
  h.set("Content-Type", "application/json");

  const res = await fetch(endpoint, { headers: h });

  if (!res.ok) throw res;

  const result = await res.json();
  const hits = result.hits || [];
  const found = result.found || 0;

  if (hits.length === 0 && !found) {
    return {
      items: [],
      page: 1,
      pages: 1,
    };
  }

  return {
    items: hits.map((x: any) => x.document),
    page,
    pages: Math.ceil(found / HITS_PER_PAGE),
  };
}

const f = <T extends any[]>(i: T | undefined, exp: (v: string) => string) => {
  return (i || []).map(exp).join(" || ");
};

function buildFilterBy(
  params: Omit<EndowsQueryParamsParsed, "fields" | "page">
): string {
  const f1 = [
    `env:=${env}`,
    "published:=true",
    f(params.countries, (x) => `hq_country:=${x} || active_in_countries:=${x}`),
    f(params.endow_designation, (x) => `endow_designation:=${x}`),
    f(params.kyc_only, (x) => `kyc_donors_only:=${x}`),
    f(params.fund_opt_in, (x) => `fund_opt_in:=${x}`),
    f(params.sdgs, (x) => `sdgs:=${x}`),
  ].filter(Boolean);

  // when filtering, searching, also include unclaimed npos
  const f2 = f1.concat(
    f(
      f1.length > 2 || params.query ? [true, false] : params.claimed,
      (x) => `claimed:=${x}`
    )
  );

  return f2.filter(Boolean).join(" && ");
}
