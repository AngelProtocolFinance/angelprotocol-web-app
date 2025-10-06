import type { EmailSQS } from "@better-giving/types/email-sqs";
import { APP_NAME } from "constants/env";
import { SendEmailCommand, ses } from ".server/aws/ses";

export async function send_email(
  payload: Extract<
    EmailSQS.Payload,
    { template: "donation-error" | "donation-microdeposit-action" }
  >
) {
  const cmd = new SendEmailCommand({
    FromEmailAddress: `${APP_NAME} 😇 <hello@better.giving>`,
    Destination: {
      ToAddresses: payload.recipients,
      BccAddresses: ["hi@better.giving"],
    },
    Content: {
      Template: {
        TemplateName: payload.template,
        TemplateData: JSON.stringify(payload.data),
      },
    },
  });
  const response = await ses.send(cmd);
  console.info(`Sent ${payload.template}: ${response.MessageId}`);
}
