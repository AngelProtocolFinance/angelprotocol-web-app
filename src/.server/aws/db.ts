import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
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
import { NavHistoryDB } from "@better-giving/nav-history";
import { PayoutsDB } from "@better-giving/payouts";
import {
  apes_aws_access_key_id,
  apes_aws_secret_access_key,
  aws_access_key_id,
  aws_region,
  aws_secret_access_key,
  env,
} from "../env";

export const ap = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: aws_region,
    credentials: {
      accessKeyId: aws_access_key_id,
      secretAccessKey: aws_secret_access_key,
    },
  }),
  { marshallOptions: { removeUndefinedValues: true } }
);

export const apes = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: aws_region,
    credentials: {
      accessKeyId: apes_aws_access_key_id,
      secretAccessKey: apes_aws_secret_access_key,
    },
  }),
  { marshallOptions: { removeUndefinedValues: true } }
);

export const bappdb = new BankingApplicationsDb(ap, env);
export const podb = new PayoutsDB(apes, env);
export const navdb = new NavHistoryDB(apes, env);
export const baldb = new BalanceDb(apes, env);
export const btxdb = new BalanceTxsDb(apes, env);
export const npodb = new NpoDb(ap, env);
