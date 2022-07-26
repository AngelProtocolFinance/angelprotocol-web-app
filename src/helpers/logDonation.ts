import { Chain, TxLogPayload } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { apes_endpoint } from "constants/urls";

const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken("angelprotocol-web-app");
  const response = await fetch(apes_endpoint + "/donation", {
    method: "POST",
    headers: { authorization: generatedToken },
    body: JSON.stringify({ ...payload, ...payload.kycData }),
  });

  //success = 2xx
  if (response.status < 200 || response.status > 299) {
    throw new LogDonationFail(payload.chain, payload.transactionId);
  }
};

export default logDonation;

export class LogDonationFail extends Error {
  chain: Chain;
  txHash: string;
  constructor(chain: Chain, txHash: string) {
    super();
    this.chain = chain;
    this.txHash = txHash;
    this.name = "LogDonationFail";
  }
}
