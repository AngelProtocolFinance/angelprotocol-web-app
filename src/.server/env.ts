import * as v from "valibot";
const required = v.pipe(v.string(), v.nonEmpty("required"));
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
export const aws_access_key_id = v.parse(
  required,
  process.env.AWS_ACCESS_KEY_ID
);
export const aws_secret_access_key = v.parse(
  required,
  process.env.AWS_SECRET_ACCESS_KEY
);
export const aws_region = v.parse(required, process.env.AWS_REGION);
