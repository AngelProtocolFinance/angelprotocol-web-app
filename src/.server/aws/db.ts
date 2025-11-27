import {
  DynamoDBDocumentClient,
  type TranslateConfig,
} from "@aws-sdk/lib-dynamodb";
export {
  GetCommand,
  BatchGetCommand,
  QueryCommand,
  DeleteCommand,
  PutCommand,
  UpdateCommand,
  TransactWriteCommand,
  type UpdateCommandInput,
  type TransactWriteCommandInput,
  type QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BalanceDb } from "@better-giving/balance";
import { BalanceTxsDb } from "@better-giving/balance-txs";
import { BankingApplicationsDb } from "@better-giving/banking-applications";
import {
  DonationDonorsDb,
  DonationsDb,
  OnHoldDonationsDb,
  SubsDb,
} from "@better-giving/donation";
import { NpoDb } from "@better-giving/endowment";
import { FundDb } from "@better-giving/fundraiser";
import { LiquidDb } from "@better-giving/liquid";
import { PayoutsDB } from "@better-giving/payouts";
import { RegDb } from "@better-giving/reg";
import { UserDb } from "@better-giving/user";
import { FormsDb } from "lib/forms";
import { NavHistoryDB } from "lib/nav";
import { Table } from "lib/table/db";
import {
  aws_access_key_id,
  aws_region,
  aws_secret_access_key,
  env,
} from "../env";

const config: TranslateConfig = {
  marshallOptions: {
    removeUndefinedValues: true,
  },
};
export const ap = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: aws_region,
    credentials: {
      accessKeyId: aws_access_key_id,
      secretAccessKey: aws_secret_access_key,
    },
  }),
  config
);

export const bappdb = new BankingApplicationsDb(ap, env);
export const podb = new PayoutsDB(ap, env);
export const navdb = new NavHistoryDB(ap, env);
export const liqdb = new LiquidDb(ap, env);
export const baldb = new BalanceDb(ap, env);
export const btxdb = new BalanceTxsDb(ap, env);
export const npodb = new NpoDb(ap, env);
export const userdb = new UserDb(ap, env);
export const funddb = new FundDb(ap, env);
export const regdb = new RegDb(ap, env);
export const dondb = new DonationsDb(ap, env);
export const onholddb = new OnHoldDonationsDb(ap, env);
export const subsdb = new SubsDb(ap, env);
export const donordb = new DonationDonorsDb(ap, env);
export const table = new Table(ap, env);
export const formsdb = new FormsDb(ap, env);
