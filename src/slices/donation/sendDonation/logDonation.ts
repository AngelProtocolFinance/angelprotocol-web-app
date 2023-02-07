import { TxLogPayload } from "types/aws";
import { createAuthToken } from "helpers";
import { LogDonationFail } from "errors/errors";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken("angelprotocol-web-app");
  const response = await fetch(APIs.apes + "/v2/donation", {
    method: "POST",
    headers: { authorization: generatedToken },
    body: JSON.stringify({
      ...payload,
      ...payload.kycData,
      //helps AWS determine which txs are testnet and mainnet without checking all chainIDs
      network: IS_TEST ? "testnet" : "mainnet",
    }),
  });

  if (!response.ok) {
    throw new LogDonationFail(payload.chainId, payload.transactionId);
  }
};

export default logDonation;
