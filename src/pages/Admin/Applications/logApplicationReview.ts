import { UpdateApplication } from "services/aws/types";
import createAuthToken, { UserTypes } from "helpers/createAuthToken";
import { chainIDs } from "constants/chainIDs";
import { aws_endpoint } from "constants/urls";

const logApplicationReview: ReviewLogger = async (payload) => {
  const generatedToken = createAuthToken(UserTypes.CHARITY_OWNER);
  const is_test = payload.chain_id === chainIDs.testnet;
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

export type ReviewLogger = (payload: UpdateApplication) => Promise<void>;

export class LogApplicationUpdateError extends Error {
  chainId: string;
  pollId: string;
  constructor(chainId: string, pollId: string) {
    super();
    this.chainId = chainId;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}
