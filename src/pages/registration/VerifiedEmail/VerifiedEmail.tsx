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

const VerifiedEmail = () => {
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
    () => ({
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
      EndowmentAgreementVerified:
        jwtData.Registration.EndowmentAgreementVerified,
    }),
    [jwtData, pathNames]
  );

  useEffect(() => {
    if (!is_expired) {
      dispatch(updateUserData(responseData));
      localStorage.setItem("userData", JSON.stringify(responseData));
    }
  }, [is_expired, dispatch, responseData]);

  const resendVerificationEmail = useCallback(async () => {
    if (responseData.PK) {
      const response: any = await resendEmail({
        uuid: responseData.PK,
        type: "verify-email",
        body: responseData,
      });
      response.data
        ? toast.info(response.data?.message)
        : toast.error(response.error?.data.message);
    } else {
      toast.error("Invalid Data. Please ask the administrator about that.");
    }
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
};

export default VerifiedEmail;
