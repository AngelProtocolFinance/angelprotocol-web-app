import * as v from "valibot";
export const envSchema = v.fallback(
  v.union([v.literal("staging"), v.literal("production")]),
  "staging"
);
export const env = v.parse(envSchema, process.env.ENVIRONMENT);
export const cloudsearchSearchEndpoint = v.parse(
  v.pipe(v.string(), v.url()),
  process.env.CLOUDSEARCH_SEARCH_ENDPOINT
);
