import type { OnHoldDonation } from "@better-giving/donation";
import type { EmailSQS } from "@better-giving/types/email-sqs";
import { type Environment, tables } from "@better-giving/types/list";

import type { Endow } from "@better-giving/endowment/db";
import { DeleteCommand, GetCommand, ap, apes } from ".server/aws/db";
import { SendEmailCommand, ses } from ".server/aws/ses";

export const getOrder = async (orderId: string) => {
  /// RETRIEVE ORDER DETAILS ///
  const cmd = new GetCommand({
    TableName: tables.on_hold_donations,
    Key: { transactionId: orderId } satisfies OnHoldDonation.PrimaryKey,
  });

  return apes
    .send(cmd)
    .then<OnHoldDonation.DBRecord | undefined>((res) => res.Item as any);
};

export async function deleteOrder(orderId: string) {
  const cmd = new DeleteCommand({
    TableName: tables.on_hold_donations,
    Key: { transactionId: orderId } satisfies OnHoldDonation.PrimaryKey,
    ReturnValues: "ALL_OLD",
  });

  return apes.send(cmd);
}

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
