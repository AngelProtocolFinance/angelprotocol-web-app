import { TxLogPayload } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { apes_endpoint } from "constants/urls";

const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken("angelprotocol-web-app");
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
