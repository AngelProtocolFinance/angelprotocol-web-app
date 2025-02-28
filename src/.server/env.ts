import * as v from "valibot";
const required = v.pipe(v.string(), v.nonEmpty("required"));
const urlSchema = v.pipe(v.string(), v.url());
export const envSchema = v.fallback(
  v.union([v.literal("staging"), v.literal("production")]),
  "staging"
);
export type Env = v.InferOutput<typeof envSchema>;
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
export const apes_aws_access_key_id = v.parse(
  required,
  process.env.APES_AWS_ACCESS_KEY_ID
);
export const apes_aws_secret_access_key = v.parse(
  required,
  process.env.APES_AWS_SECRET_ACCESS_KEY
);
export const aws_region = v.parse(required, process.env.AWS_REGION);

export const api_encryption_key = v.parse(
  required,
  process.env.API_ENCRYPTION_KEY
);

export const npEnvs = {
  apiToken: v.parse(required, process.env.NOWPAYMENTS_API_KEY),
  baseUrl: v.parse(required, process.env.NOWPAYMENTS_API_URL),
  webhookUrl: v.parse(required, process.env.NOWPAYMENTS_WEBHOOK_URL),
  ipnSecret: v.parse(required, process.env.NOWPAYMENTS_IPN_SECRET),
};

export const discordEnvs = {
  awsMonitorUrl: v.parse(required, process.env.DISCORD_AWS_MONITOR_WEBHOOK_URL),
};
