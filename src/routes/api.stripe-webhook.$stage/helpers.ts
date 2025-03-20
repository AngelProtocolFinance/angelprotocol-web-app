import type { EmailSQS } from "@better-giving/types/email-sqs";
import { SendEmailCommand, ses } from ".server/aws/ses";

export async function sendEmail(
  payload: Extract<
    EmailSQS.Payload,
    { template: "donation-error" | "donation-microdeposit-action" }
  >
) {
  const emailInput = {
    FromEmailAddress: "Better Giving 😇 <hello@better.giving>",
    Destination: { ToAddresses: payload.recipients },
    Content: {
      Template: {
        TemplateName: payload.template,
        TemplateData: JSON.stringify(payload.data),
      },
    },
  };
  const response = await ses.send(new SendEmailCommand(emailInput));
  console.log(`Sent ${payload.template}: ${response.MessageId}`);
}
