import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRequestEmailMutation } from "services/aws/registration";
import { Charity } from "services/aws/types";
import { app, site } from "constants/routes";
import createCharityData from "../createCharityData";
import routes from "../routes";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

type JwtData = Charity & {
  authorization: string;
  exp: number;
  iat: number;
  user: string;
};

export default function VerifiedEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const pathNames = location.pathname.split("/");
  const jwtToken = pathNames[pathNames.length - 1];
  const jwtData = jwtDecode<JwtData>(jwtToken);

  const is_expired = Math.floor(Date.now() / 1000) >= jwtData.exp;
  const charity = createCharityData(jwtData, jwtToken);

  const resendVerificationEmail = useCallback(async () => {
    if (!charity.ContactPerson.PK) {
      console.error("Invalid Data. Please ask the administrator about that.");
      return;
    }

    const response: any = await resendEmail({
      uuid: charity.ContactPerson.PK,
      type: "verify-email",
      body: charity,
    });
    response.data
      ? console.info(response.data?.message)
      : console.error(response.error?.data.message);
  }, [charity, resendEmail]);

  if (is_expired) {
    return (
      <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
    );
  }

  return (
    <VerificationSuccessful
      isLoading={isLoading}
      charity={charity}
      onClick={() =>
        navigate(`${site.app}/${app.register}/${routes.dashboard}`)
      }
    />
  );
}
