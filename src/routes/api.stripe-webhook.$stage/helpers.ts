import type { FinalRecorderPayload } from "@better-giving/donation/final-recorder";
import type { EmailSQS } from "@better-giving/types/email-sqs";
import { SendEmailCommand, ses } from ".server/aws/ses";
import { SendMessageCommand, apes as apesSQS } from ".server/aws/sqs";
import { q_url_donation_processor } from ".server/env";

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

export async function sendMessage(body: FinalRecorderPayload) {
  await apesSQS.send(
    new SendMessageCommand({
      MessageBody: JSON.stringify(body),
      QueueUrl: q_url_donation_processor,
    })
  );
}
