import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { UnprocessedCharity } from "types/aws";
import { useErrorContext } from "contexts/ErrorContext";
import { UnexpectedStateError } from "errors/errors";
import { appRoutes } from "constants/routes";
import RegLoader from "../common/RegLoader";
import useSendVerificationEmail from "../common/useSendVerificationEmail";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import routes from "../routes";
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
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [isEmailExpired, setEmailExpired] = useState(false);
  const [charity, setCharity] = useState<UnprocessedCharity>();

  useEffect(() => {
    try {
      const jwtData = extractJwtData(location);

      setEmailExpired(jwtData.isEmailExpired);
      setCharity(jwtData.charity);
      setLoading(false);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [location, handleError]);

  const resendVerificationEmail = useCallback(async () => {
    try {
      if (!charity) {
        throw new UnexpectedStateError("Charity is undefined");
      }

      const emailPayload = {
        Name: charity.Registration.OrganizationName,
        Email: charity.ContactPerson.Email,
        FirstName: charity.ContactPerson.FirstName,
        LastName: charity.ContactPerson.LastName,
        Role: charity.ContactPerson.Role,
        PhoneNumber: charity.ContactPerson.PhoneNumber,
      };
      await sendVerificationEmail(charity.ContactPerson.PK, emailPayload);

      navigate(`${appRoutes.register}/${routes.confirmEmail}`);
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [charity, handleError, navigate, sendVerificationEmail]);

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

function extractJwtData(location: Location) {
  const pathNames = location.pathname.split("/");
  const jwtToken = pathNames[pathNames.length - 1];
  const jwtData = jwtDecode<JwtData>(jwtToken);
  const { authorization, exp, iat, user, ...charity } = jwtData;
  const isEmailExpired = Math.floor(Date.now() / 1000) >= exp;
  return { charity, isEmailExpired };
}
