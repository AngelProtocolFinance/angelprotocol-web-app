import { ChainIDs, Denoms } from "@types-lists";
import { Receiver, TxLogPayload } from "@types-server/aws";
import { LogDonationFail } from "errors/errors";
import createAuthToken from "helpers/createAuthToken";
import { currency_text } from "constants/currency";
import { apes_endpoint } from "constants/urls";
import { UserTypes } from "constants/user-types";

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

  //success = 2xx
  if (response.status < 200 || response.status > 299) {
    throw new LogDonationFail(chainId, txhash);
  }
};

export default logDonation;

type DonationLogger = (
  txhash: string,
  chainId: ChainIDs,
  amount: string,
  denom: Denoms,
  splitLiq: string,
  walletAddress: string,
  receipient: string | number
) => Promise<void>;
