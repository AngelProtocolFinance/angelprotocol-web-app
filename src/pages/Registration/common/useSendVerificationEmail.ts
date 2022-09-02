import { useCallback } from "react";
import { useRequestEmailMutation } from "services/aws/registration";
import { logger } from "helpers";
import { UnexpectedStateError } from "errors/errors";

export default function useSendVerificationEmail() {
  const [sendEmail, { isLoading }] = useRequestEmailMutation();

  const sendVerificationEmail = useCallback(
    async (uuid: string, body: any) => {
      if (!uuid) {
        throw new UnexpectedStateError("Email UUID is null");
      }
      if (!body) {
        throw new UnexpectedStateError("Email body is null");
      }

      const response: any = await sendEmail({
        type: "verify-email",
        body,
        uuid,
      });

      if (!response.data) {
        throw new Error(response.error);
      } else {
        logger.info(response.data.message);
      }
    },
    [sendEmail]
  );

  return { sendVerificationEmail, isLoading };
}
