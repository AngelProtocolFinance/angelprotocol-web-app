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
import {
  apes_aws_access_key_id,
  apes_aws_secret_access_key,
  aws_access_key_id,
  aws_region,
  aws_secret_access_key,
} from "../env";

export const ap = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: aws_region,
    credentials: {
      accessKeyId: aws_access_key_id,
      secretAccessKey: aws_secret_access_key,
    },
  })
);

export const apes = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: aws_region,
    credentials: {
      accessKeyId: apes_aws_access_key_id,
      secretAccessKey: apes_aws_secret_access_key,
    },
  })
);
