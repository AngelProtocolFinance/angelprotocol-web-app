import type { EmailSQS } from "@better-giving/types/email-sqs";
import { SendEmailCommand, ses } from ".server/aws/ses";

/**
 * Sends email to donor
 */
export async function send_email(
  payload: Extract<EmailSQS.Payload, { template: "donation-error" }>
) {
  return ses.send(
    new SendEmailCommand({
      FromEmailAddress: "Better Giving 😇 <hello@better.giving>",
      Destination: { ToAddresses: payload.recipients },
      Content: {
        Template: {
          TemplateName: payload.template,
          TemplateData: JSON.stringify(payload.data),
        },
      },
    })
  );
}
