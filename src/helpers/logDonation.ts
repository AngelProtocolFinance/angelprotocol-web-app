import { TxLogPayload } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { LogDonationFail } from "errors/errors";
import { APIs } from "constants/urls";

const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken("angelprotocol-web-app");
  const response = await fetch(APIs.apes + "/donation", {
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
