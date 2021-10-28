import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { UserSlice } from "Redux/slices/userSlice";
import { app, register, site } from "types/routes";
import { toast, ToastContainer } from "react-toastify";
import { useRequestEmailMutation } from "api/registerAPIs";
import Action from "./Action";

const VerifiedEmail = () => {
  //url = app/register/verify
  const history = useHistory();
  //TODO: redux refactor
  const dispatch = useDispatch();
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const { updateUserData } = UserSlice.actions;

  const location = history.location;
  const pathNames = location.pathname.split("/");
  const jwtData: any = jwtDecode(pathNames[pathNames.length - 1]);

  // check expired
  const is_expired = Math.floor(Date.now() / 1000) >= jwtData.exp;

  const responseData = {
    ...jwtData.ContactPerson,
    CharityName: jwtData.Registration.CharityName,
    CharityName_ContactEmail: jwtData.Registration.CharityName_ContactEmail,
    RegistrationDate: jwtData.Registration.RegistrationDate,
    RegistrationStatus: jwtData.Registration.RegistrationStatus,
    userType: jwtData.user,
    authorization: jwtData.authorization,
    token: pathNames[pathNames.length - 1],
  };
  if (!is_expired) {
    dispatch(updateUserData(responseData));
  }

  const resendVerificationEmail = async () => {
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
  };

  return (
    <div>
      <div className="flex justify-center rounded-xl mb-5">
        {is_expired ? (
          <FaExclamation className="text-4xl text-red-500" />
        ) : (
          <FaCheck className="text-4xl text-yellow-blue" />
        )}
      </div>
      {!is_expired && (
        <div>
          <p className="text-2xl font-bold">Thank you for registering.</p>
          <p className="text-2xl font-bold mb-10">
            {responseData.CharityName}, {responseData.FirstName}!
          </p>
          <p className="text-2xl font-bold">Your registration reference is </p>
          <p className="text-2xl font-bold text-yellow-600">
            {responseData.PK}
          </p>
        </div>
      )}
      {is_expired ? (
        <div className="my-10">
          <span className="text-2xl font-bold">
            Your verification link was expired. please resend the verification
            email.
          </span>
        </div>
      ) : (
        <div className="my-10">
          <span className="text-base">
            We have sent it to your email address for your future reference.
          </span>
        </div>
      )}
      <div className="mb-2">
        {is_expired ? (
          <Action
            classes="bg-thin-blue w-48 h-12"
            onClick={resendVerificationEmail}
            title="resend"
            disabled={isLoading}
          />
        ) : (
          <Action
            //TODO:simplify link
            classes="bg-thin-blue w-48 h-12"
            onClick={() =>
              history.push(`${site.app}/${app.register}/${register.status}`)
            }
            title="Continue"
            disabled={isLoading}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifiedEmail;
