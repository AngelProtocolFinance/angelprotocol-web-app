import { Nowpayments } from "@better-giving/nowpayments";
import { nowPayments as envs } from ".server/env";
export const np = new Nowpayments(envs);
