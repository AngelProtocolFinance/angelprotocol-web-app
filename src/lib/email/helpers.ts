import type { Donation, TTemplate } from "@better-giving/emails";
import { emails } from "constants/common";
import { round_to_cents } from "helpers/decimal";
import { round_number } from "helpers/round-number";
import { SendEmailCommand, ses } from ".server/aws/ses";

export async function send_email(template: TTemplate, to: string[]) {
  const { name, ...data } = template;
  const cmd = new SendEmailCommand({
    FromEmailAddress: emails.hello,
    Destination: {
      ToAddresses: to,
      BccAddresses: name.startsWith("registration-") ? [emails.tim] : [],
    },
    Content: {
      Template: {
        TemplateName: name,
        TemplateData: JSON.stringify(data),
      },
    },
  });
  return ses.send(cmd);
}

export const to_ses_amnts = (
  amnt: number,
  denom: string,
  usd_value: number
) => {
  return {
    prettyAmount: `${round_to_cents(amnt, usd_value)} ${denom}`,
    prettyUSDamount:
      denom.toLowerCase() === "usd"
        ? ""
        : `${round_number(usd_value, 2).toFixed(2)}`,
  } satisfies Pick<Donation.Data.TTx, "prettyAmount" | "prettyUSDamount">;
};
