import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { UnprocessedCharity } from "types/aws";
import { useErrorContext } from "contexts/ErrorContext";
import useSendVerificationEmail from "../common/useSendVerificationEmail";
import { GENERIC_ERROR_MESSAGE } from "../constants";
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
  const { sendVerificationEmail, isLoading } = useSendVerificationEmail();
  const { handleError } = useErrorContext();

  const pathNames = location.pathname.split("/");
  const jwtToken = pathNames[pathNames.length - 1];
  const jwtData = jwtDecode<JwtData>(jwtToken);
  const { authorization, exp, iat, user, ...newCharity } = jwtData;
  const is_expired = Math.floor(Date.now() / 1000) >= exp;

  const resendVerificationEmail = useCallback(async () => {
    try {
      await sendVerificationEmail(newCharity.ContactPerson.PK, newCharity);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [newCharity, sendVerificationEmail]);

  if (is_expired) {
    return (
      <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
    );
  }
  return <VerificationSuccessful newCharity={newCharity} />;
}
