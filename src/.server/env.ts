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
export const q_url_donation_processor = v.parse(
  required,
  process.env.Q_URL_DONATION_PROCESSOR
);

export const api_encryption_key = v.parse(
  required,
  process.env.API_ENCRYPTION_KEY
);

export const npEnvs = {
  apiToken: v.parse(required, process.env.NOWPAYMENTS_API_KEY),
  baseUrl: v.parse(required, process.env.NOWPAYMENTS_API_URL),
  ipnSecret: v.parse(required, process.env.NOWPAYMENTS_IPN_SECRET),
};

export const discordEnvs = {
  awsMonitorUrl: v.parse(required, process.env.DISCORD_AWS_MONITOR_WEBHOOK_URL),
  fiatMonitorUrl: v.parse(
    required,
    process.env.DISCORD_FIAT_MONITOR_WEBHOOK_URL
  ),
};

export const hubspotEnvs = {
  accessToken: v.parse(required, process.env.HUBSPOT_ACCESS_TOKEN),
  newsletterFormId: v.parse(required, process.env.HUBSPOT_NEWSLETTER_FORM_ID),
  newsletterPortalId: v.parse(
    required,
    process.env.HUBSPOT_NEWSLETTER_PORTAL_ID
  ),
};

export const stripeEnvs = {
  secretKey: v.parse(required, process.env.STRIPE_SECRET_KEY),
  subsProductId: v.parse(required, process.env.STRIPE_SUBS_PRODUCT_ID),
  webhookSecret: v.parse(required, process.env.STRIPE_WEBHOOK_SECRET),
};

export const wiseApiToken = v.parse(required, process.env.WISE_API_TOKEN);
