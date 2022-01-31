import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useRequestEmailMutation } from "services/aws/registration";
import { User } from "services/user/types";
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
  const userData = useMemo(
    () => createUserData(jwtData, pathNames),
    [jwtData, pathNames]
  );

  useEffect(() => {
    if (!is_expired) {
      dispatch(updateUserData(userData));
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [is_expired, dispatch, userData]);

  const resendVerificationEmail = useCallback(async () => {
    if (!userData.PK) {
      toast.error("Invalid Data. Please ask the administrator about that.");
      return;
    }

    const response: any = await resendEmail({
      uuid: userData.PK,
      type: "verify-email",
      body: userData,
    });
    response.data
      ? toast.info(response.data?.message)
      : toast.error(response.error?.data.message);
  }, [userData, resendEmail]);

  const navigateToRegistrationStatusPage = useCallback(
    () => history.push(`${site.app}/${app.register}/${registration.status}`),
    [history]
  );

  const content = is_expired ? (
    <LinkExpired onClick={resendVerificationEmail} isLoading={isLoading} />
  ) : (
    <VerificationSuccessful
      userData={userData}
      onClick={navigateToRegistrationStatusPage}
      isLoading={isLoading}
    />
  );

  return (
    <>
      {content}
      <ToastContainer />
    </>
  );
}

function createUserData(jwtData: any, pathNames: string[]): User {
  return {
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
  };
}
