import type { Donation, TTemplate } from "@better-giving/emails";
import { emails } from "constants/common";
import { rd, ru_vdec, usdpu } from "helpers/decimal";
import { SendEmailCommand, ses } from ".server/aws/ses";

export async function send_email(template: TTemplate, to: string[]) {
  const { name, ...data } = template;
  const cmd = new SendEmailCommand({
    FromEmailAddress: `Better Giving 😇 <${emails.hi}>`,
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
    prettyAmount: `${ru_vdec(amnt, usdpu(usd_value, amnt))} ${denom}`,
    prettyUSDamount: denom.toLowerCase() === "usd" ? "" : rd(usd_value),
  } satisfies Pick<Donation.Data.TTx, "prettyAmount" | "prettyUSDamount">;
};
