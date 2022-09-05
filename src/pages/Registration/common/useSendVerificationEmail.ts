import { useCallback } from "react";
import { ContactPerson, Registration } from "types/aws";
import { useRequestEmailMutation } from "services/aws/registration";
import { logger } from "helpers";
import { UnexpectedStateError } from "errors/errors";

type Body = Pick<
  ContactPerson,
  "Email" | "FirstName" | "LastName" | "Role" | "PhoneNumber"
> &
  Pick<Registration, "CharityName">;

export default function useSendVerificationEmail() {
  const [sendEmail, { isLoading }] = useRequestEmailMutation();

  const sendVerificationEmail = useCallback(
    async (uuid: string | undefined, body: Body) => {
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
