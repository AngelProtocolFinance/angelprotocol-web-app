import type { EmailSQS } from "@better-giving/types/email-sqs";
import { type Environment, tables } from "@better-giving/types/list";

import type { Endow } from "@better-giving/endowment/db";
import { GetCommand, ap } from ".server/aws/db";
import { SendEmailCommand, ses } from ".server/aws/ses";

/**
 * Sends email to donor
 */
export async function sendEmail(
  payload: Extract<EmailSQS.Payload, { template: "donation-error" }>
) {
  return ses.send(
    new SendEmailCommand({
      FromEmailAddress: `Better Giving 😇 <hello@better.giving>`,
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

export async function getEndow(endowId: number, environment: Environment) {
  const command = new GetCommand({
    TableName: tables.endowments_v3,
    Key: {
      PK: `Endow#${endowId}`,
      SK: environment,
    },
  });
  return ap
    .send(command)
    .then<Endow.DbRecord | undefined>((data) => data.Item as any);
}
