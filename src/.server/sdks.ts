import { Chariot } from "@better-giving/chariot";
import { Discord } from "@better-giving/helpers/discord";
import { Nowpayments } from "@better-giving/nowpayments";
import { Wise } from "@better-giving/wise";
import { Client, Receiver } from "@upstash/qstash";
import Stripe from "stripe";
import {
  chariot_envs,
  discordEnvs,
  env,
  npEnvs,
  qtash_envs,
  stripeEnvs,
  wiseApiToken,
} from "./env";

export const discordAwsMonitor = new Discord(discordEnvs.awsMonitorUrl);
export const discordFiatMonitor = new Discord(discordEnvs.fiatMonitorUrl);
export const np = new Nowpayments(npEnvs);
export const stripe = new Stripe(stripeEnvs.secretKey);

export const wise = new Wise({
  apiToken: wiseApiToken,
  sandbox: env === "staging",
});

export const chariot = new Chariot(chariot_envs);

export const qstash = new Client({ token: qtash_envs.token });

export const qstash_receiver = new Receiver({
  currentSigningKey: qtash_envs.currentSigningKey,
  nextSigningKey: qtash_envs.nextSigningKey,
});
