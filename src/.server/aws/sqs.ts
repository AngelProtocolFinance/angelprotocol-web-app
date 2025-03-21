import { SQSClient } from "@aws-sdk/client-sqs";
import {
  apes_aws_access_key_id,
  apes_aws_secret_access_key,
  aws_region,
} from "../env";

export { SendMessageCommand } from "@aws-sdk/client-sqs";

export const apes = new SQSClient({
  region: aws_region,
  credentials: {
    accessKeyId: apes_aws_access_key_id,
    secretAccessKey: apes_aws_secret_access_key,
  },
});
