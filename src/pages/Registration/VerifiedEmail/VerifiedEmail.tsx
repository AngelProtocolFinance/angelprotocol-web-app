import { app, site } from "constants/routes";
import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRequestEmailMutation } from "services/aws/registration";
import { User } from "services/user/types";
import routes from "../routes";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

export default function VerifiedEmail() {
  const history = useHistory();
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const pathNames = history.location.pathname.split("/");
  const jwtToken = pathNames[pathNames.length - 1];
  const jwtData: any = jwtDecode(jwtToken);
  const is_expired = Math.floor(Date.now() / 1000) >= jwtData.exp;
  const userData = createUserData(jwtData, jwtToken);

  const resendVerificationEmail = useCallback(async () => {
    if (!userData.PK) {
      console.error("Invalid Data. Please ask the administrator about that.");
      return;
    }

    const response: any = await resendEmail({
      uuid: userData.PK,
      type: "verify-email",
      body: userData,
    });
    response.data
      ? console.info(response.data?.message)
      : console.error(response.error?.data.message);
  }, [userData, resendEmail]);

  const navigateToDashboard = useCallback(
    () => history.push(`${site.app}/${app.register}/${routes.dashboard}`),
    [history]
  );

  if (is_expired) {
    return (
      <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
    );
  }

  return (
    <VerificationSuccessful
      userData={userData}
      onClick={navigateToDashboard}
      isLoading={isLoading}
    />
  );
}

function createUserData(jwtData: any, token: string): User {
  return {
    ...jwtData.ContactPerson,
    CharityName: jwtData.Registration.CharityName,
    CharityName_ContactEmail: jwtData.Registration.CharityName_ContactEmail,
    RegistrationDate: jwtData.Registration.RegistrationDate,
    RegistrationStatus: jwtData.Registration.RegistrationStatus,
    userType: jwtData.user,
    authorization: jwtData.authorization,
    token: token,
    ProofOfIdentity: jwtData.Registration.ProofOfIdentity,
    ProofOfEmployment: jwtData.Registration.ProofOfEmployment,
    EndowmentAgreement: jwtData.Registration.EndowmentAgreement,
    ProofOfIdentityVerified: jwtData.Registration.ProofOfIdentityVerified,
    ProofOfEmploymentVerified: jwtData.Registration.ProofOfEmploymentVerified,
    EndowmentAgreementVerified: jwtData.Registration.EndowmentAgreementVerified,
    ProofOfRegistration: jwtData.Registration.ProofOfRegistration,
    FinancialStatements: jwtData.Registration.FinancialStatements,
    AuditedFinancialReports: jwtData.Registration.AuditedFinancialReports,
    ProofOfRegistrationVerified:
      jwtData.Registration.ProofOfRegistrationVerified,
    FinancialStatementsVerified:
      jwtData.Registration.FinancialStatementsVerified,
    AuditedFinancialReportsVerified:
      jwtData.Registration.AuditedFinancialReportsVerified,
  };
}
