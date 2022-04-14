import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRequestEmailMutation } from "services/aws/registration";
import { CharityData } from "services/aws/types";
import { app, site } from "constants/routes";
import createUserData from "../createUserData";
import routes from "../routes";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

type JwtData = CharityData & {
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
  const userData = createUserData(jwtData, jwtToken);

  const resendVerificationEmail = useCallback(async () => {
    if (!userData.ContactPerson.PK) {
      console.error("Invalid Data. Please ask the administrator about that.");
      return;
    }

    const response: any = await resendEmail({
      uuid: userData.ContactPerson.PK,
      type: "verify-email",
      body: userData,
    });
    response.data
      ? console.info(response.data?.message)
      : console.error(response.error?.data.message);
  }, [userData, resendEmail]);

  if (is_expired) {
    return (
      <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
    );
  }

  return (
    <VerificationSuccessful
      isLoading={isLoading}
      userData={userData}
      onClick={() =>
        navigate(`${site.app}/${app.register}/${routes.dashboard}`)
      }
    />
  );
}
