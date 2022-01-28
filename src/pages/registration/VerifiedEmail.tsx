import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { app, registration, site } from "types/routes";
import { toast, ToastContainer } from "react-toastify";
import Action from "../../components/ActionButton/Action";
import { useRequestEmailMutation } from "services/aws/registration";
import { useSetter } from "store/accessors";
import { updateUserData } from "services/user/userSlice";
import { useCallback, useEffect, useMemo } from "react";

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
    <LinkExpiredContent
      onClick={resendVerificationEmail}
      isLoading={isLoading}
    />
  ) : (
    <VerificationSuccessfulContent
      responseData={responseData}
      onClick={navigateToRegistrationStatusPage}
      isLoading={isLoading}
    />
  );
};

export default VerifiedEmail;

function LinkExpiredContent({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="flex justify-center rounded-xl mb-5">
        <FaExclamation className="text-4xl text-red-500" />
      </div>
      <div className="my-10">
        <span className="text-2xl font-bold">
          Your verification link has expired. Please resend the verification
          email.
        </span>
      </div>
      <div className="mb-2">
        <Action
          classes="bg-thin-blue w-48 h-12"
          onClick={onClick}
          title="resend"
          disabled={isLoading}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

function VerificationSuccessfulContent({
  responseData,
  onClick,
  isLoading,
}: {
  responseData: any;
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="flex justify-center rounded-xl mb-5">
        <FaCheck className="text-4xl text-yellow-blue" />
      </div>
      <div>
        <p className="text-2xl font-bold">Thank you for registering.</p>
        <p className="text-2xl font-bold mb-10">
          {responseData.CharityName}, {responseData.FirstName}!
        </p>
        <p className="text-2xl font-bold">Your registration reference is </p>
        <p className="text-2xl font-bold text-yellow-600">{responseData.PK}</p>
      </div>

      <div className="my-10">
        <span className="text-base">
          We have sent it to your email address for your future reference.
        </span>
      </div>
      <div className="mb-2">
        <Action
          //TODO:simplify link
          classes="bg-thin-blue w-48 h-12"
          onClick={onClick}
          title="Continue"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
