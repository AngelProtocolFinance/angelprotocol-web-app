import { LogDonationFail } from "@/errors/errors";
import { createAuthToken } from "@/helpers";
import { APIs, IS_TEST } from "@ap/constants";
import { TxLogPayload } from "@/types/aws";

//log donation, with optional receipt
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
