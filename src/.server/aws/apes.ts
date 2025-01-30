import awsLite from "@aws-lite/client";
import {
  apes_aws_access_key_id,
  apes_aws_secret_access_key,
  aws_region,
} from "../env";
export const apes = await awsLite({
  /** @ts-ignore */
  plugins: [import("@aws-lite/dynamodb")],
  region: aws_region,
  secretAccessKey: apes_aws_secret_access_key,
  accessKeyId: apes_aws_access_key_id,
});
