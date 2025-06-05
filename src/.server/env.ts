import * as v from "valibot";
const urlSchema = v.pipe(v.string(), v.url());
export const envSchema = v.fallback(
  v.union([v.literal("staging"), v.literal("production")]),
  "staging"
);

export const _var = (name: string): string => {
  const v = process.env[name];
  if (!v) {
    console.error(`Environment variable ${name} is not set.`);
  }
  return v || "";
};
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
export const aws_access_key_id = _var("AWS_ACCESS_KEY_ID");
export const aws_secret_access_key = _var("AWS_SECRET_ACCESS_KEY");
export const apes_aws_access_key_id = _var("APES_AWS_ACCESS_KEY_ID");
export const apes_aws_secret_access_key = _var("APES_AWS_SECRET_ACCESS_KEY");
export const aws_region = _var("AWS_REGION");
export const q_url_donation_processor = _var("Q_URL_DONATION_PROCESSOR");

export const api_encryption_key = _var("API_ENCRYPTION_KEY");

export const npEnvs = {
  apiToken: _var("NOWPAYMENTS_API_KEY"),
  baseUrl: _var("NOWPAYMENTS_API_URL"),
  ipnSecret: _var("NOWPAYMENTS_IPN_SECRET"),
};

export const discordEnvs = {
  awsMonitorUrl: _var("DISCORD_AWS_MONITOR_WEBHOOK_URL"),
  fiatMonitorUrl: _var("DISCORD_FIAT_MONITOR_WEBHOOK_URL"),
};

export const stripeEnvs = {
  secretKey: _var("STRIPE_SECRET_KEY"),
  subsProductId: _var("STRIPE_SUBS_PRODUCT_ID"),
  webhookSecret: _var("STRIPE_WEBHOOK_SECRET"),
};

export const wiseApiToken = _var("WISE_API_TOKEN");

export const chariot_envs = {
  api_key: _var("CHARIOT_API_KEY"),
  api_url: _var("CHARIOT_API_URL"),
  signing_key: _var("CHARIOT_SIGNING_KEY"),
};

export const qtash_envs = {
  token: _var("QSTASH_TOKEN"),
  url: v.parse(urlSchema, _var("QSTASH_URL")),
  currentSigningKey: _var("QSTASH_CURRENT_SIGNING_KEY"),
  nextSigningKey: _var("QSTASH_NEXT_SIGNING_KEY"),
};
