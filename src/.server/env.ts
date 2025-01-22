import * as v from "valibot";
const urlSchema = v.pipe(v.string(), v.url());
export const envSchema = v.fallback(
  v.union([v.literal("staging"), v.literal("production")]),
  "staging"
);
export const env = v.parse(envSchema, process.env.ENVIRONMENT);
export const cloudsearchNpoSearchEndpoint = v.parse(
  urlSchema,
  process.env.CLOUDSEARCH_NPO_SEARCH_ENDPOINT
);
export const cloudsearchFundsSearchEndpoint = v.parse(
  urlSchema,
  process.env.CLOUDSEARCH_FUNDS_SEARCH_ENDPOINT
);
