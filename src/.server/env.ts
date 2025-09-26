import type { Environment } from "@better-giving/user";
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
export const env = _var("ENVIRONMENT") as Environment;

export const typesense_envs = {
  api_key: _var("TYPESENSE_API_KEY"),
  endpoint: v.parse(urlSchema, _var("TYPESENSE_ENDPOINT")),
};
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

export const wise_envs = {
  api_token: _var("WISE_API_TOKEN"),
  profile_id: _var("WISE_PROFILE_ID"),
  api_url: _var("WISE_API_URL"),
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

export const anvil_envs = {
  api_key: _var("ANVIL_API_KEY"),
  webhook_token: _var("ANVIL_WEBHOOK_TOKEN"),
  fsa_template_id: _var("ANVIL_FSA_TEMPLATE_ID"),
  org_slug: _var("ANVIL_ORG_SLUG"),
};

export const cognito_envs = {
  client_id: _var("COGNITO_CLIENT_ID"),
  domain: _var("COGNITO_DOMAIN"),
  endpoint: _var("COGNITO_ENDPOINT"),
};

export const session_secret = _var("SESSION_SECRET");

export const kv_envs = {
  url: _var("KV_REST_API_URL"),
  token: _var("KV_REST_API_TOKEN"),
};

export const gemini_api_key = _var("GEMINI_API_KEY");
export const mongodb_url = _var("MONGODB_URL");

export const coingecko_api_key = _var("COINGECKO_API_KEY");

const deposit_addr_evm = _var("DEPOSIT_ADDR_EVM");
const deposit_addr_hbar = _var("DEPOSIT_ADDR_HBAR");
const deposit_addr_reef = _var("DEPOSIT_ADDR_REEF");
export const deposit_addrs_envs = (chain: string) => {
  switch (chain.toUpperCase()) {
    case "ETH":
      return deposit_addr_evm;
    case "BSC":
      return deposit_addr_evm;
    case "HBAR":
      return deposit_addr_hbar;
    case "REEF":
      return deposit_addr_reef;
    default:
      return "chain not supported";
  }
};
