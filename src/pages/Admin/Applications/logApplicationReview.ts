import { Chain } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { LogApplicationUpdateError } from "errors/errors";
import { aws_endpoint } from "constants/urls";

interface Payload {
  PK: string;
  poll_id: string;
  chain: Chain;
}

const logApplicationReview = async (payload: Payload): Promise<void> => {
  const generatedToken = createAuthToken("charity-owner");
  const response = await fetch(
    `${aws_endpoint}/registration?uuid=${payload.PK}`,
    {
      method: "PUT",
      headers: { authorization: generatedToken },
      body: JSON.stringify({
        chain_id: payload.chain_id,
        poll_id: +payload.poll_id,
      }),
    }
  );

  //success = 2xx
  if (response.status < 200 || response.status > 299) {
    throw new LogApplicationUpdateError(payload.chain_id, payload.poll_id);
  }
};

export default logApplicationReview;
