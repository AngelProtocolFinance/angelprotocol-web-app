import type {
  FundsEndowMemberOfParams,
  FundsPage,
  FundsParams,
} from "@better-giving/fundraiser";
import type * as cs from "@better-giving/fundraiser/cloudsearch";
import type { ToDoc } from "@better-giving/types/cloudsearch";
import { cloudsearchFundsSearchEndpoint, env } from "./env";

const HITS_PER_PAGE = 25;

type FundHit = ToDoc<cs.CloudsearchFund>;

export const cacheControl =
  "public, max-age=0, s-max-age=30, stale-while-revalidate=60";

export const getFunds = async ({
  query = "",
  page = 1,
}: FundsParams): Promise<FundsPage> => {
  const filters = [`env:'${env}'`, "active:1", "featured:1"];
  const q = (() => {
    if (!query) {
      return `expiration:['${new Date().toISOString()}',}`;
    }
    // Escape single quotes in the query string
    const safeQ = query.replace(/'/g, "\\'");
    return `(and (or name:'${safeQ}' description:'${safeQ}') expiration:['${new Date().toISOString()}',})`;
  })();

  const startAt = (page - 1) * HITS_PER_PAGE;

  // Construct search parameters
  const endpoint = new URL(cloudsearchFundsSearchEndpoint);
  endpoint.pathname = "/2013-01-01/search";
  endpoint.searchParams.set("q", q);
  endpoint.searchParams.set("q.parser", "structured");
  endpoint.searchParams.set("fq", `(and ${filters.join(" ")})`);
  endpoint.searchParams.set("sort", "name asc");
  endpoint.searchParams.set("size", HITS_PER_PAGE.toString());
  endpoint.searchParams.set("start", startAt.toString());

  const res = await fetch(endpoint);
  if (!res.ok) throw res;

  const result = await res.json();
  const hits = result.hits?.hit || [];
  const found = result.hits?.found;

  if (hits.length === 0) {
    return {
      items: [],
      page: 1,
      numPages: 1,
    };
  }

  return {
    items: hits.map((hit: any) => hitToItem(hit.fields)),
    page,
    numPages: Math.ceil((found ?? 1) / HITS_PER_PAGE),
  };
};

export const getFundsNpoMemberOf = async (
  endowId: number,
  params: FundsEndowMemberOfParams
) => {
  const _filters = [`env:'${env}'`].concat(
    params.npoProfileFeatured ? ["active:1"] : []
  );

  const { c, m, ...rest } = {
    c: `creator_id:'${endowId}'`,
    m: `members:'${endowId}'`,
    ...(params.npoProfileFeatured && {
      expiry: `expiration:['${new Date().toISOString()}',}`,
      onlyMember: `members_csv:'${endowId}'`,
    }),
  };
  const q = `(and (or ${c} ${m}) ${Object.values(rest)
    .filter((f) => f)
    .join(" ")})`;

  const endpoint = new URL(cloudsearchFundsSearchEndpoint);
  endpoint.pathname = "/2013-01-01/search";
  endpoint.searchParams.set("q", q);
  endpoint.searchParams.set("q.parser", "structured");
  endpoint.searchParams.set("fq", `(and ${_filters.join(" ")})`);
  endpoint.searchParams.set("sort", "active desc, expiration desc");
  endpoint.searchParams.set("size", HITS_PER_PAGE.toString());
  endpoint.searchParams.set("start", "0");

  const res = await fetch(endpoint);
  if (!res.ok) throw res;

  const result = await res.json();

  const hits = result.hits?.hit || [];
  if (hits.length === 0) return [];

  return hits.map((hit: any) => hitToItem(hit.fields));
};

export const hitToItem = (hit: FundHit) => {
  const item: cs.CloudsearchFund = {
    id: hit.id,
    name: hit.name,
    description: hit.description,
    env: hit.env,
    logo: hit.logo,
    banner: hit.banner,
    featured: hit.featured === "1",
    active: hit.active === "1",
    verified: hit.verified === "1",
    donation_total_usd: Number.parseInt(hit.donation_total_usd[0], 10),
    expiration: hit.expiration,
    members: (hit.members || []).map((m) => Number.parseInt(m, 10)),
    target: hit.target,
    creator_id: hit.creator_id,
    creator_name: hit.creator_name,
  };
  return item;
};
