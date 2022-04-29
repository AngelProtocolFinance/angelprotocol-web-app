import { TxLogPayload } from "services/apes/types";
import { UserTypes } from "services/user/types";
import createAuthToken from "helpers/createAuthToken";
import { apes_endpoint } from "constants/urls";

const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken(UserTypes.WEB_APP);
  const response = await fetch(apes_endpoint + "/donation", {
    method: "POST",
    headers: { authorization: generatedToken },
    body: JSON.stringify(payload),
  });

  //success = 2xx
  if (response.status < 200 || response.status > 299) {
    throw new LogDonationFail(payload.chainId, payload.transactionId);
  }
};

export default logDonation;

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
