import { SQSClient } from "@aws-sdk/client-sqs";
import { aws_access_key_id, aws_region, aws_secret_access_key } from "../env";

export { SendMessageCommand } from "@aws-sdk/client-sqs";

export const sqsc_ap = new SQSClient({
  region: aws_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});
