import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UnprocessedCharity } from "types/aws";
import { useErrorContext } from "contexts/ErrorContext";
import RegLoader from "../common/RegLoader";
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
  const { sendVerificationEmail, isLoading: isSendingEmail } =
    useSendVerificationEmail();
  const { handleError } = useErrorContext();
  const [isLoading, setLoading] = useState(true);
  const [isEmailExpired, setEmailExpired] = useState(false);
  const [charity, setCharity] = useState<UnprocessedCharity>();

  useEffect(() => {
    try {
      const pathNames = location.pathname.split("/");
      const jwtToken = pathNames[pathNames.length - 1];
      const jwtData = jwtDecode<JwtData>(jwtToken);
      const { authorization, exp, iat, user, ...newCharity } = jwtData;
      const is_expired = Math.floor(Date.now() / 1000) >= exp;
      setEmailExpired(is_expired);
      setCharity(newCharity);
      setLoading(false);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [location, handleError]);

  const resendVerificationEmail = useCallback(async () => {
    try {
      await sendVerificationEmail(charity!.ContactPerson.PK, charity);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [charity, handleError, sendVerificationEmail]);

  if (isLoading) {
    return <RegLoader />;
  }

  if (isEmailExpired) {
    return (
      <LinkExpired
        onClick={resendVerificationEmail}
        isLoading={isSendingEmail}
      />
    );
  }
  return <VerificationSuccessful newCharity={charity!} />;
}
