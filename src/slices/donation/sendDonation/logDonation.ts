import { TxLogPayload } from "types/aws";
import { network } from "services/constants";
import { version as v } from "services/helpers";
import { createAuthToken } from "helpers";
import { LogDonationFail } from "errors/errors";
import { APIs } from "constants/urls";

//log donation, with optional receipt
const logDonation = async (payload: TxLogPayload) => {
  const generatedToken = createAuthToken("angelprotocol-web-app");
  const response = await fetch(APIs.apes + `/${v(3)}/donation`, {
    method: "POST",
    headers: { authorization: generatedToken },
    body: JSON.stringify({
      ...payload,
      ...payload.kycData,
      //helps AWS determine which txs are testnet and mainnet without checking all chainIDs
      network,
    }),
  });

  if (!response.ok) {
    throw new LogDonationFail(payload.chainId, payload.transactionId);
  }
};

export default logDonation;
