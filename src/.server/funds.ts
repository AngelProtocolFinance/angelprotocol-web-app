import type {
  IFundsNpoMemberOfSearchObj,
  IFundsPage,
  IFundsSearchObj,
} from "@better-giving/fundraiser";
import { env } from "./env";
import { typesense_funds } from "./sdks";

const HITS_PER_PAGE = 25;

const now_fn = () => Math.floor(Date.now() / 1000);

export const get_funds = async ({
  query = "",
  page = 1,
}: IFundsSearchObj): Promise<IFundsPage> => {
  const filters = [
    `env:=${env}`,
    "active:=true",
    "featured:=true",
    `expiration:>=${now_fn()}`,
  ].join(" && ");

  // Build search query - if no query, search all with date filter
  const q = query || "*";
  // Construct Typesense search request
  const search_params = new URLSearchParams({
    q,
    filter_by: filters,
    sort_by: query ? "_text_match:desc,name:asc" : "name:asc",
    per_page: HITS_PER_PAGE.toString(),
    page: page.toString(),
  });

  if (query) {
    search_params.set("query_by", "name,description,creator_name");
    search_params.set("query_by_weights", "3,2,1");
  }

  // Make request to Typesense

  const res = await typesense_funds.get("documents/search", {
    searchParams: search_params,
  });

  if (!res.ok) throw res;

  const result: any = await res.json();
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
    items: hits.map((hit: any) => hit.document),
    page,
    pages: Math.ceil(found / HITS_PER_PAGE),
  };
};

export const get_funds_npo_memberof = async (
  endowId: number,
  params: IFundsNpoMemberOfSearchObj
) => {
  // Build filter conditions
  const filters = [
    `env:=${env}`,
    `(creator_id:=${endowId} || members:=${endowId})`,
  ];

  // Add featured filter if requested
  if (params.npo_profile_featured) {
    filters.push("active:=true");
    // Add expiration filter - funds that haven't expired
    filters.push(`expiration:>=${now_fn()}`);
    // Add "only member" filter - equivalent to members_csv in CloudSearch
    filters.push(`members_csv:=${endowId}`);
  }

  const filter_by = filters.join(" && ");

  // Sort by active status first, then expiration
  const sort_by = "active:desc,expiration:desc";

  const search_params = new URLSearchParams({
    q: "*",
    filter_by,
    sort_by,
    per_page: HITS_PER_PAGE.toString(),
    page: "1",
    use_cache: "true",
  });

  // Make request to Typesense
  const res = await typesense_funds.get("documents/search", {
    searchParams: search_params,
  });

  if (!res.ok) throw res;

  const result: any = await res.json();
  const hits = result.hits || [];

  if (hits.length === 0) return [];

  return hits.map((hit: any) => hit.document);
};
