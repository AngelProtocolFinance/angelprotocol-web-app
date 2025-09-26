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
import { NpoDb } from "@better-giving/endowment";
import { FundDb } from "@better-giving/fundraiser";
import { LiquidDb } from "@better-giving/liquid";
import { NavHistoryDB } from "@better-giving/nav-history";
import { PayoutsDB } from "@better-giving/payouts";
import { RegDb } from "@better-giving/reg";
import { UserDb } from "@better-giving/user";
import {
  apes_aws_access_key_id,
  apes_aws_secret_access_key,
  aws_access_key_id,
  aws_region,
  aws_secret_access_key,
  env,
} from "../env";
import { DonationsDb, OnHoldDonationsDb } from "@better-giving/donation";

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

export const apes = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: aws_region,
    credentials: {
      accessKeyId: apes_aws_access_key_id,
      secretAccessKey: apes_aws_secret_access_key,
    },
  }),
  config
);

export const bappdb = new BankingApplicationsDb(ap, env);
export const podb = new PayoutsDB(apes, env);
export const navdb = new NavHistoryDB(apes, env);
export const liqdb = new LiquidDb(apes, env);
export const baldb = new BalanceDb(apes, env);
export const btxdb = new BalanceTxsDb(apes, env);
export const npodb = new NpoDb(ap, env);
export const userdb = new UserDb(ap, env);
export const funddb = new FundDb(ap, env);
export const regdb = new RegDb(ap, env);
export const dondb = new DonationsDb(apes, env);
export const onholddb = new OnHoldDonationsDb(apes, env);
