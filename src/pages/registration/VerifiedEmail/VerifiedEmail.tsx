import jwtDecode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useRequestEmailMutation } from "services/aws/registration";
import { User, UserTypes } from "services/user/types";
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
  const jwtPayload = useMemo(
    () => jwtDecode<JwtPayload>(pathNames[pathNames.length - 1]),
    [pathNames]
  );

  const is_expired = useMemo(
    () => jwtPayload.exp && Math.floor(Date.now() / 1000) >= jwtPayload.exp,
    [jwtPayload]
  );
  const userData = useMemo(
    () => createUserData(jwtPayload, pathNames),
    [jwtPayload, pathNames]
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
    history.push(registration.confirm);
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

function createUserData(jwtPayload: JwtPayload, pathNames: string[]): User {
  return {
    ...jwtPayload.ContactPerson,
    CharityName: jwtPayload.Registration.CharityName,
    CharityName_ContactEmail: jwtPayload.Registration.CharityName_ContactEmail,
    RegistrationDate: jwtPayload.Registration.RegistrationDate,
    RegistrationStatus: jwtPayload.Registration.RegistrationStatus,
    token: pathNames[pathNames.length - 1],
    ProofOfIdentity: jwtPayload.Registration.ProofOfIdentity,
    ProofOfEmployment: jwtPayload.Registration.ProofOfEmployment,
    EndowmentAgreement: jwtPayload.Registration.EndowmentAgreement,
    ProofOfIdentityVerified: jwtPayload.Registration.ProofOfIdentityVerified,
    ProofOfEmploymentVerified:
      jwtPayload.Registration.ProofOfEmploymentVerified,
    EndowmentAgreementVerified:
      jwtPayload.Registration.EndowmentAgreementVerified,
  };
}

type JwtPayload = DefaultJwtPayload & {
  ContactPerson: any;
  Registration: any;
  authorization: string;
  user: UserTypes;
};
