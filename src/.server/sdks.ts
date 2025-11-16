import Anvil from "@anvilco/anvil";
import { Chariot } from "@better-giving/chariot";
import { Discord } from "@better-giving/helpers/discord";
import { Nowpayments } from "@better-giving/nowpayments";
import { Wise } from "@better-giving/wise";

import { PayPalSDK } from "@better-giving/paypal/helpers";

import { Client, Receiver } from "@upstash/qstash";
import Stripe from "stripe";
import type { Fetcher } from "types/api";
import {
  anvil_envs,
  chariot_envs,
  coingecko_api_key,
  discord_envs,
  env,
  hubspot_envs,
  np_envs,
  paypal_envs,
  qtash_envs,
  stripe_envs,
  typesense_envs,
  wise_envs,
} from "./env";

export const aws_monitor = new Discord(discord_envs.awsMonitorUrl);
export const fiat_monitor = new Discord(discord_envs.fiatMonitorUrl);
export const np = new Nowpayments(np_envs);
export const stripe = new Stripe(stripe_envs.secret_key);

export const wise = new Wise({
  apiToken: wise_envs.api_token,
  sandbox: env === "staging",
});

export const chariot = new Chariot(chariot_envs);

export const qstash = new Client({ token: qtash_envs.token });

export const qstash_receiver = new Receiver({
  currentSigningKey: qtash_envs.currentSigningKey,
  nextSigningKey: qtash_envs.nextSigningKey,
});

export const anvil = new Anvil({
  apiKey: anvil_envs.api_key,
});

export const coingecko: Fetcher = (url_fn, init_fn) => {
  const x = new URL("https://api.coingecko.com");
  const h = new Headers({
    "x-cg-demo-api-key": coingecko_api_key,
    accept: "application/json",
  });
  return fetch(
    url_fn(x, (p) => p),
    init_fn?.(h) || { headers: h }
  );
};

export const typesense: Fetcher = (url_fn, init_fn) => {
  const x = new URL(typesense_envs.endpoint);
  const h = new Headers({
    "x-typesense-api-key": typesense_envs.api_key,
    accept: "application/json",
  });
  return fetch(
    url_fn(x, (p) => p),
    init_fn?.(h) || { headers: h }
  );
};

export const hubspot_forms: Fetcher = (url_fn, init_fn) => {
  const x = new URL(hubspot_envs.forms_api);
  const h = new Headers({
    authorization: `Bearer ${hubspot_envs.access_token}`,
  });
  return fetch(
    url_fn(x, (p) => p),
    init_fn?.(h) || { headers: h }
  );
};
export const paypal = new PayPalSDK({
  client_id: paypal_envs.client_id,
  client_secret: paypal_envs.client_secret,
  api_url: paypal_envs.api_url,
});
