import { SESv2Client } from "@aws-sdk/client-sesv2";
import { aws_access_key_id, aws_region, aws_secret_access_key } from "../env";
export {
  SendEmailCommand,
  type SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";

export const ses = new SESv2Client({
  region: aws_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});
