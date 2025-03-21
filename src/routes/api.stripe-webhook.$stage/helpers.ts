import type {
  Donation,
  OnHoldDonation,
  StripeDonation,
} from "@better-giving/donation";
import type { FinalRecorderPayload } from "@better-giving/donation/final-recorder";
import type { EmailSQS } from "@better-giving/types/email-sqs";
import type { Environment } from "@better-giving/types/list";
import { SendEmailCommand, ses } from ".server/aws/ses";
import { SendMessageCommand, apes as apesSQS } from ".server/aws/sqs";
import { q_url_donation_processor } from ".server/env";

interface OnHoldParams {
  amount: number;
  isRecurring: boolean;
  metadata: StripeDonation.Metadata;
  paymentMethod: string;
  transactionId: string;
  usdValue: number;
  verificationLink: string | null;
}

export function buildOnHoldRecord(
  params: OnHoldParams
): OnHoldDonation.FiatDBRecord {
  const { metadata, verificationLink } = params;
  return {
    amount: params.amount,
    tipAmount: Number(metadata.tipAmount), // stripe converts metadata to string
    usdValue: params.usdValue,
    appUsed: metadata.appUsed as Donation.App,
    chainId: "fiat",
    chainName: "Fiat",
    charityName: metadata.charityName,
    nonProfitMsg: metadata.nonProfitMsg,
    denomination: metadata.denomination,
    destinationChainId: "fiat",
    donationFinalized: false,
    email: metadata.email,
    endowmentId: Number(metadata.endowmentId),
    programId: metadata.programId,
    programName: metadata.programName,
    inHonorOf: metadata.inHonorOf,
    tributeNotif: metadata.tributeNotif && JSON.parse(metadata.tributeNotif),
    fiatRamp: "STRIPE",
    claimed: metadata.claimed === "true",
    fiscalSponsored: metadata.fiscalSponsored === "true",
    hideBgTip: metadata.hideBgTip === "true",
    network: metadata.network as Environment,
    paymentMethod: params.paymentMethod,
    splitLiq: metadata.splitLiq,
    transactionDate: new Date().toISOString(),
    transactionId: params.transactionId,
    title: metadata.title,
    kycEmail: metadata.kycEmail ?? "",
    fullName: metadata.fullName,
    ukGiftAid: metadata.ukGiftAid === "true",
    isRecurring: params.isRecurring,
    status: verificationLink ? "intent" : "pending",
    ...(verificationLink ? { stripeDepositVerifyUrl: verificationLink } : {}),
    ...(metadata.country
      ? {
          streetAddress: metadata.streetAddress,
          city: metadata.city,
          state: metadata.state,
          zipCode: metadata.zipCode,
          country: metadata.country,
        }
      : {}),
  };
}

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
