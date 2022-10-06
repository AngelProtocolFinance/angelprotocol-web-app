import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { VerifEmailBody } from "../common/types";
import { UnprocessedApplication } from "types/aws";
import { useErrorContext } from "contexts/ErrorContext";
import { UnexpectedStateError } from "errors/errors";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import useSendVerificationEmail from "../common/useSendVerificationEmail";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import routes from "../routes";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

type JwtData = UnprocessedApplication & {
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
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [isEmailExpired, setEmailExpired] = useState(false);
  const [application, setApplication] = useState<UnprocessedApplication>();

  useEffect(() => {
    try {
      const jwtData = extractJwtData(location);

      setEmailExpired(jwtData.isEmailExpired);
      setApplication(jwtData.application);
      setLoading(false);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [location, handleError]);

  const resendVerificationEmail = useCallback(async () => {
    try {
      if (!application) {
        throw new UnexpectedStateError("Charity is undefined");
      }

      const emailPayload: VerifEmailBody = {
        OrganizationName: application.Registration.OrganizationName,
        Email: application.ContactPerson.Email,
        FirstName: application.ContactPerson.FirstName,
        LastName: application.ContactPerson.LastName,
        Role: application.ContactPerson.Role,
        PhoneNumber: application.ContactPerson.PhoneNumber,
      };
      await sendVerificationEmail(application.ContactPerson.PK, emailPayload);

      navigate(`${appRoutes.register}/${routes.confirmEmail}`);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [application, handleError, navigate, sendVerificationEmail]);

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
  return <VerificationSuccessful newCharity={application!} />;
}

function extractJwtData(location: Location): {
  application: UnprocessedApplication;
  isEmailExpired: boolean;
} {
  const pathNames = location.pathname.split("/");
  const jwtToken = pathNames[pathNames.length - 1];
  const jwtData = jwtDecode<JwtData>(jwtToken);
  const { authorization, exp, iat, user, ...application } = jwtData;
  const isEmailExpired = Math.floor(Date.now() / 1000) >= exp;
  return { application, isEmailExpired };
}
