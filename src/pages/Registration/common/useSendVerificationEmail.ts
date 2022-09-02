import { useCallback } from "react";
import { ContactPerson, Registration } from "types/aws";
import { useRequestEmailMutation } from "services/aws/registration";
import { logger } from "helpers";
import { UnexpectedStateError } from "errors/errors";

// 3e5 = 300 (seconds) * 1000 (miliseconds)
const FIVE_MINUTES_IN_MILIS = 3e5;

type Body = Pick<
  ContactPerson,
  "Email" | "FirstName" | "LastName" | "Role" | "PhoneNumber"
> &
  Pick<Registration, "CharityName">;

export default function useSendVerificationEmail() {
  const [sendEmail, { isLoading }] = useRequestEmailMutation();

  const sendVerificationEmail = useCallback(
    async (uuid: string | undefined, lastSentDate: string, body: Body) => {
      verifyParams(uuid, lastSentDate, body);

      const response = await sendEmail({
        type: "verify-email",
        body,
        uuid: uuid!,
      });

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

function verifyParams(
  uuid: string | undefined,
  lastSentDate: string,
  body: Body
) {
  if (!uuid) {
    throw new UnexpectedStateError("Email UUID is undefined");
  }
  if (!body) {
    throw new UnexpectedStateError("Email body is undefined");
  }
  if (
    new Date(lastSentDate).getTime() + FIVE_MINUTES_IN_MILIS <
    new Date().getTime()
  ) {
    throw new Error(
      "Verification email sent too recently. Please wait at least 5 minutes before trying again"
    );
  }
}
