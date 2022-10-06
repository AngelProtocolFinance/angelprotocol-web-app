import { useCallback } from "react";
import { VerifEmailBody } from "./types";
import { useRequestEmailMutation } from "services/aws/registration";
import { logger } from "helpers";
import { UnexpectedStateError } from "errors/errors";

export default function useSendVerificationEmail() {
  const [sendEmail, { isLoading }] = useRequestEmailMutation();

  const sendVerificationEmail = useCallback(
    async (uuid: string | undefined, body: VerifEmailBody) => {
      if (!uuid) {
        throw new UnexpectedStateError("Email UUID is undefined");
      }
      if (!body) {
        throw new UnexpectedStateError("Email body is undefined");
      }

      const response = await sendEmail({ type: "verify-email", body, uuid });

      if ("error" in response) {
        throw response.error;
      } else {
        logger.info(response.data.message);
      }
    },
    [sendEmail]
  );

  return { sendVerificationEmail, isLoading };
}
