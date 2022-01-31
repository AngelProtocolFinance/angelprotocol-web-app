import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequestEmailMutation } from "services/aws/registration";
import { updateUserData } from "services/user/userSlice";
import { useSetter } from "store/accessors";
import { app, registration, site } from "types/routes";
import LinkExpired from "./LinkExpired";
import VerificationSuccessful from "./VerificationSuccessful";

export default function VerifiedEmail() {
  const history = useHistory();
  const dispatch = useSetter();
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const pathNames = history.location.pathname.split("/");
  const jwtData: any = useMemo(
    () => jwtDecode(pathNames[pathNames.length - 1]),
    [pathNames]
  );
  const is_expired = useMemo(
    () => Math.floor(Date.now() / 1000) >= jwtData.exp,
    [jwtData]
  );
  const responseData = useMemo(
    () => createUserData(jwtData, pathNames),
    [jwtData, pathNames]
  );

  useEffect(() => {
    if (!is_expired) {
      dispatch(updateUserData(responseData));
      localStorage.setItem("userData", JSON.stringify(responseData));
    }
  }, [is_expired, dispatch, responseData]);

  const resendVerificationEmail = useCallback(async () => {
    if (!responseData.PK) {
      toast.error("Invalid Data. Please ask the administrator about that.");
      return;
    }

    const response: any = await resendEmail({
      uuid: responseData.PK,
      type: "verify-email",
      body: responseData,
    });
    response.data
      ? toast.info(response.data?.message)
      : toast.error(response.error?.data.message);
  }, [responseData, resendEmail]);

  const navigateToRegistrationStatusPage = useCallback(
    () => history.push(`${site.app}/${app.register}/${registration.status}`),
    [history]
  );

  return is_expired ? (
    <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
  ) : (
    <VerificationSuccessful
      responseData={responseData}
      onClick={navigateToRegistrationStatusPage}
      isLoading={isLoading}
    />
  );
}

const createUserData = (jwtData: any, pathNames: string[]) => ({
  ...jwtData.ContactPerson,
  CharityName: jwtData.Registration.CharityName,
  CharityName_ContactEmail: jwtData.Registration.CharityName_ContactEmail,
  RegistrationDate: jwtData.Registration.RegistrationDate,
  RegistrationStatus: jwtData.Registration.RegistrationStatus,
  userType: jwtData.user,
  authorization: jwtData.authorization,
  token: pathNames[pathNames.length - 1],
  ProofOfIdentity: jwtData.Registration.ProofOfIdentity,
  ProofOfEmployment: jwtData.Registration.ProofOfEmployment,
  EndowmentAgreement: jwtData.Registration.EndowmentAgreement,
  ProofOfIdentityVerified: jwtData.Registration.ProofOfIdentityVerified,
  ProofOfEmploymentVerified: jwtData.Registration.ProofOfEmploymentVerified,
  EndowmentAgreementVerified: jwtData.Registration.EndowmentAgreementVerified,
});
