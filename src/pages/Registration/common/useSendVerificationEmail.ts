import { useCallback } from "react";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { logger } from "helpers";
import { UnexpectedStateError } from "errors/errors";

export default function useSendVerificationEmail() {
  const { handleError } = useErrorContext();
  const [sendEmail, { isLoading }] = useRequestEmailMutation();

  const sendVerificationEmail = useCallback(
    async (uuid: string, body: any) => {
      if (!uuid) {
        handleError(new UnexpectedStateError("Email UUID is null"));
        return;
      }
      if (!body) {
        handleError(new UnexpectedStateError("Email body is null"));
        return;
      }

      const response: any = await sendEmail({
        type: "verify-email",
        body,
        uuid,
      });

      if (!response.data) {
        handleError(response.error);
      } else {
        logger.info(response.data.message);
      }
    },
    [handleError]
  );

  return { sendVerificationEmail, isLoading };
}
