import awsLite from "@aws-lite/client";
/// <reference types="@aws-lite/dynamodb-types" />
import { aws_access_key_id, aws_region, aws_secret_access_key } from "../env";
export const ap = await awsLite({
  /** @ts-ignore */
  plugins: [import("@aws-lite/dynamodb")],
  region: aws_region,
  secretAccessKey: aws_secret_access_key,
  accessKeyId: aws_access_key_id,
});
