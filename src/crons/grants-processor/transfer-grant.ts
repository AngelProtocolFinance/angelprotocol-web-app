import { wise_envs } from ".server/env";
import { wise } from ".server/sdks";

export async function transfer_grant(to: number, amount: number, ref: string) {
  const recipient = await wise.v2_account(to);

  const quote = await wise.quote(wise_envs.profile_id, {
    sourceCurrency: "USD",
    targetCurrency: recipient.currency,
    sourceAmount: amount,
    targetAmount: null,
    payOut: null,
    preferredPayIn: null,
    targetAccount: to.toString(),
  });

  // Initiating transfer
  const transfer = await wise.transfer({
    targetAccount: to.toString(),
    quoteUuid: quote.id,
    customerTransactionId: ref,
    details: {
      transferPurpose: "verification.transfers.purpose.other",
      sourceOfFunds: "verification.source.of.funds.other",
    },
  });

  if (transfer.errors) throw transfer.errors;

  const funding = await wise.fund_transfer(transfer.id, +wise_envs.profile_id, {
    type: "BALANCE",
  });

  if (funding.status === "REJECTED") {
    throw `funding failed ${funding.errorCode}`;
  }
  return transfer.id;
}
