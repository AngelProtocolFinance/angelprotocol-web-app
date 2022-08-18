import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { UnprocessedCharity } from "types/server/aws";
import { useRequestEmailMutation } from "services/aws/registration";
import { logger } from "helpers";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

type JwtData = UnprocessedCharity & {
  authorization: string;
  exp: number;
  iat: number;
  user: string;
};

export default function VerifiedEmail() {
  const location = useLocation();
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const pathNames = location.pathname.split("/");
  const jwtToken = pathNames[pathNames.length - 1];
  const jwtData = jwtDecode<JwtData>(jwtToken);
  const { authorization, exp, iat, user, ...newCharity } = jwtData;

  const is_expired = Math.floor(Date.now() / 1000) >= exp;

  const resendVerificationEmail = useCallback(async () => {
    if (!newCharity.ContactPerson.PK) {
      logger.error("Invalid Data. Please ask the administrator about that.");
      return;
    }

    const response: any = await resendEmail({
      uuid: newCharity.ContactPerson.PK,
      type: "verify-email",
      body: newCharity,
    });
    response.data
      ? logger.info(response.data?.message)
      : logger.error(response.error?.data.message);
  }, [newCharity, resendEmail]);

  if (is_expired) {
    return (
      <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
    );
  }
  return <VerificationSuccessful newCharity={newCharity} />;
}
