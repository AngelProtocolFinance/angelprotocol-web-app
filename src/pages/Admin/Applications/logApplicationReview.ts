import createAuthToken from "helpers/createAuthToken";
import { LogApplicationUpdateError } from "errors/errors";
import { chainIDs } from "constants/chainIDs";
import { aws_endpoint } from "constants/urls";

interface UpdateApplicationPayload {
  PK: string;
  poll_id: string;
  chain_id: string;
}
type ReviewLogger = (payload: UpdateApplicationPayload) => Promise<void>;
const logApplicationReview: ReviewLogger = async (payload) => {
  const generatedToken = createAuthToken("charity-owner");
  const is_test = payload.chain_id === chainIDs.terra_test;
  const chain_id = is_test ? "testnet" : "mainnet";
  const response = await fetch(
    `${aws_endpoint}/registration?uuid=${payload.PK}`,
    {
      method: "PUT",
      headers: { authorization: generatedToken },
      body: JSON.stringify({
        chain_id,
        poll_id: +payload.poll_id,
      }),
    }
  );

  //success = 2xx
  if (response.status < 200 || response.status > 299) {
    throw new LogApplicationUpdateError(chain_id, payload.poll_id);
  }
};

export default logApplicationReview;
