import { Discord } from "@better-giving/helpers/discord";
import { Nowpayments } from "@better-giving/nowpayments";
import Stripe from "stripe";
import { discordEnvs, npEnvs, stripeEnvs } from ".server/env";

export const discordAwsMonitor = new Discord(discordEnvs.awsMonitorUrl);
export const discordFiatMonitor = new Discord(discordEnvs.fiatMonitorUrl);
export const np = new Nowpayments(npEnvs);
export const stripe = new Stripe(stripeEnvs.secretKey);
