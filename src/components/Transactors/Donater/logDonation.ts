import { chainIDs } from "constants/chainIDs";
import { currency_text, denoms } from "constants/currency";
import { apes_endpoint } from "constants/urls";
import createAuthToken from "helpers/createAuthToken";
import { Receiver, TxLogPayload } from "services/apes/types";
import { UserTypes } from "services/user/types";

const logDonation: DonationLogger = async (
  txhash,
  chainId,
  amount,
  denom,
  splitLiq,
  walletAddress,
  receipient
) => {
  let receiver: Receiver =
    typeof receipient === "string"
      ? { charityId: receipient }
      : { fundId: receipient };

  const txLogPayload: TxLogPayload = {
    ...receiver,
    transactionDate: new Date().toISOString(),
    transactionId: txhash,
    denomination: currency_text[denom],
    amount: parseFloat(amount),
    splitLiq,
    walletAddress,
    chainId,
  };

  const generatedToken = createAuthToken(UserTypes.WEB_APP);
  const response = await fetch(apes_endpoint + "/donation", {
    method: "POST",
    headers: { authorization: generatedToken },
    body: JSON.stringify(txLogPayload),
  });

  if (response.status !== 201) {
    throw new LogDonationFail(chainId, txhash);
  }
};

export default logDonation;

export type DonationLogger = (
  txhash: string,
  chainId: chainIDs,
  amount: string,
  denom: denoms,
  splitLiq: string,
  walletAddress: string,
  receipient: string | number
) => Promise<void>;

export class LogDonationFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super();
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "LogDonationFail";
  }
}
