import Anvil from "@anvilco/anvil";
import { Chariot } from "@better-giving/chariot";
import { Discord } from "@better-giving/helpers/discord";
import { Nowpayments } from "@better-giving/nowpayments";
import { Wise } from "@better-giving/wise";
import { Client, Receiver } from "@upstash/qstash";
import ky from "ky";
import Stripe from "stripe";
import {
  anvil_envs,
  chariot_envs,
  discord_envs,
  env,
  np_envs,
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

const typesense = ky.create({
  prefixUrl: typesense_envs.endpoint,
  headers: {
    "x-typesense-api-key": typesense_envs.api_key,
    "content-type": "application/json",
  },
  throwHttpErrors: false,
});

export const typesense_funds = typesense.extend((x) => ({
  prefixUrl: `${x.prefixUrl}/collections/funds`,
}));
export const typesense_npos = typesense.extend((x) => ({
  prefixUrl: `${x.prefixUrl}/collections/npos`,
}));
