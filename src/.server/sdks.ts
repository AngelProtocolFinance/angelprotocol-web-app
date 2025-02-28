import { Discord } from "@better-giving/helpers/discord";
import { Nowpayments } from "@better-giving/nowpayments";
import { discordEnvs, npEnvs } from ".server/env";

export const discordAwsMonitor = new Discord(discordEnvs.awsMonitorUrl);
export const np = new Nowpayments(npEnvs);
