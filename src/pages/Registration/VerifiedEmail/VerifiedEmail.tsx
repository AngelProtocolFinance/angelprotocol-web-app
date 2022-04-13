import { app, site } from "constants/routes";
import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRequestEmailMutation } from "services/aws/registration";
import { CharityMetadata, User } from "services/user/types";
import routes from "../routes";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

export default function VerifiedEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const pathNames = location.pathname.split("/");
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
    Website: jwtData.Registration.Website,
    UN_SDG: jwtData.Registration.UN_SDG,
    ProofOfIdentity: jwtData.Registration.ProofOfIdentity,
    ProofOfIdentityVerified: jwtData.Registration.ProofOfIdentityVerified,
    ProofOfRegistration: jwtData.Registration.ProofOfRegistration,
    ProofOfRegistrationVerified:
      jwtData.Registration.ProofOfRegistrationVerified,
    FinancialStatements: jwtData.Registration.FinancialStatements,
    FinancialStatementsVerified:
      jwtData.Registration.FinancialStatementsVerified,
    AuditedFinancialReports: jwtData.Registration.AuditedFinancialReports,
    AuditedFinancialReportsVerified:
      jwtData.Registration.AuditedFinancialReportsVerified,
    Metadata: getMetadata(jwtData),
  };
}

function getMetadata(jwtData: any): CharityMetadata {
  return {
    Banner: jwtData.Metadata?.Banner || { name: "" },
    CharityLogo: jwtData.Metadata?.CharityLogo || { name: "" },
    CharityOverview: jwtData.Metadata?.CharityOverview || "",
    TerraWallet: jwtData.Metadata?.TerraWallet || "",
  };
}
