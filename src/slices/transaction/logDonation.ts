import { TxLogPayload } from "types/aws";
import { createAuthToken } from "helpers";
import { LogDonationFail } from "errors/errors";
import { APIs } from "constants/urls";

const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken("angelprotocol-web-app");
  const response = await fetch(APIs.apes + "/v1/donation", {
    method: "POST",
    headers: { authorization: generatedToken },
    body: JSON.stringify({ ...payload, ...payload.kycData }),
  });

  //success = 2xx
  if (response.status < 200 || response.status > 299) {
    throw new LogDonationFail(payload.chainId, payload.transactionId);
  }
};

export default logDonation;
