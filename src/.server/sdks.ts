import { Discord } from "@better-giving/helpers/discord";
import { Nowpayments } from "@better-giving/nowpayments";
import { Wise } from "@better-giving/wise";
import Stripe from "stripe";
import { discordEnvs, env, npEnvs, stripeEnvs, wiseApiToken } from "./env";

export const discordAwsMonitor = new Discord(discordEnvs.awsMonitorUrl);
export const discordFiatMonitor = new Discord(discordEnvs.fiatMonitorUrl);
export const np = new Nowpayments(npEnvs);
export const stripe = new Stripe(stripeEnvs.secretKey);

export const wise = new Wise({
  apiToken: wiseApiToken,
  sandbox: env === "staging",
});
