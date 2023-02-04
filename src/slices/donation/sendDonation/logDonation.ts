import { TxLogPayload } from "types/aws";
import { createAuthToken } from "helpers";
import { IS_TEST } from "constants/env";
import { APIs } from "constants/urls";

//log donation, with optional receipt
const error =
  "Failed to log your donation for receipt purposes. Kindly send an email to support@angelprotocol.io";
const logDonation = async (payload: TxLogPayload): Promise<string | null> => {
  try {
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

    return response.ok ? null : error;
  } catch (err) {
    return error;
  }
};

export default logDonation;
