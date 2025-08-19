import type {
  EndowItem,
  EndowsQueryParamsParsed,
  INposPage,
  UnSdgNum,
} from "@better-giving/endowment";
import type * as cs from "@better-giving/endowment/cloudsearch";
import type { Ensure } from "@better-giving/types/utils";
import { typesense_envs } from "./env";

type Endow = Ensure<Partial<cs.CloudsearchEndow>, "contributions_total">;
const HITS_PER_PAGE = 20;

export async function getNpos(
  params: EndowsQueryParamsParsed
): Promise<INposPage> {
  const { fields, query: q, page = 1, ...p } = params;

  // Build filter conditions for Typesense
  const filter_by = buildFilterBy(p);

  // Build search query
  const q_text = buildSearchQuery(q);

  // Construct Typesense search request
  const search_params = new URLSearchParams({
    q: q_text,
    query_by: "name,tagline,registration_number",
    filter_by,
    sort_by: "claimed:desc,name:asc",
    per_page: HITS_PER_PAGE.toString(),
    page: page.toString(),
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

function buildFilterBy(
  params: Omit<EndowsQueryParamsParsed, "fields" | "query" | "page">
): string {
  const filters: string[] = [`env:=${"production"}`, "published:=true"];

  // Country filter - search in both hq_country and active_in_countries
  if (params.countries?.length) {
    const country_filters = params.countries.map(
      (country) => `hq_country:=${country} || active_in_countries:=${country}`
    );
    filters.push(`(${country_filters.join(" || ")})`);
  }

  // Designation filter
  if (params.endow_designation?.length) {
    const designation_filters = params.endow_designation.map(
      (designation) => `endow_designation:=${designation}`
    );
    filters.push(`(${designation_filters.join(" || ")})`);
  }

  // KYC filter
  if (params.kyc_only?.length) {
    const kyc_filters = params.kyc_only.map((kyc) => `kyc_donors_only:=${kyc}`);
    filters.push(`(${kyc_filters.join(" || ")})`);
  }

  // Fund opt-in filter
  if (params.fund_opt_in?.length) {
    const fund_filters = params.fund_opt_in.map(
      (fund) => `fund_opt_in:=${fund}`
    );
    filters.push(`(${fund_filters.join(" || ")})`);
  }

  // SDGs filter
  if (params.sdgs?.length) {
    const sdg_filters = params.sdgs.map((sdg) => `sdgs:=${sdg}`);
    filters.push(`(${sdg_filters.join(" || ")})`);
  }

  // Claimed filter
  if (params.claimed?.length) {
    const claimed_filters = params.claimed.map(
      (claimed) => `claimed:=${claimed}`
    );
    filters.push(`(${claimed_filters.join(" || ")})`);
  }

  return filters.join(" && ");
}

function buildSearchQuery(query?: string): string {
  if (!query || query === "") return "*";

  // For short queries, search in name and tagline fields
  if (query.length <= 2) {
    return query;
  }

  // For longer queries, use prefix search and exact match
  return query;
}

const processFields = (document: any): EndowItem => {
  const endow: Endow = {
    ...(document.card_img && { card_img: document.card_img }),
    ...(document.name && { name: document.name }),
    ...(document.tagline && { tagline: document.tagline }),
    ...(document.hq_country && { hq_country: document.hq_country }),
    ...(document.sdgs && {
      sdgs: Array.isArray(document.sdgs)
        ? (document.sdgs.map((s: any) =>
            Number.parseInt(s.toString(), 10)
          ) as UnSdgNum[])
        : [],
    }),
    ...(document.active_in_countries && {
      active_in_countries: document.active_in_countries,
    }),
    ...(document.endow_designation && {
      endow_designation: document.endow_designation,
    }),
    ...(document.registration_number && {
      registration_number: document.registration_number,
    }),
    ...(document.kyc_donors_only !== undefined && {
      kyc_donors_only:
        document.kyc_donors_only === "1" || document.kyc_donors_only === 1,
    }),
    ...(document.claimed !== undefined && {
      claimed: document.claimed === "1" || document.claimed === 1,
    }),
    ...(document.env && { env: document.env }),
    ...(document.id && { id: Number.parseInt(document.id.toString(), 10) }),
    ...(document.published !== undefined && {
      published: document.published === "1" || document.published === 1,
    }),
    ...(document.fund_opt_in !== undefined && {
      fund_opt_in: document.fund_opt_in === "1" || document.fund_opt_in === 1,
    }),
    ...(document.contributions_count && {
      contributions_count: Number.parseInt(
        document.contributions_count.toString(),
        10
      ),
    }),
    ...(document.target && { target: document.target }),
    contributions_total: Number.parseFloat(document.contributions_total || "0"),
  };
  return endow as EndowItem;
};
