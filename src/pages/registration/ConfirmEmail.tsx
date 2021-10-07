import { useHistory, useLocation } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { register } from "types/routes";
import { useSelector } from "react-redux";
import { TStore } from "Redux/store";
import { useRequestEmailMutation } from "api/registerAPIs";
import { toast, ToastContainer } from "react-toastify";
import { BuildEmail } from "aws-settings.config";

const ConfirmEmail = () => {
  //url = /app/register/confirm
  const history = useHistory();
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const { userData } = useSelector((state: TStore) => state.user);
  const [resendEmail, { isLoading }] = useRequestEmailMutation();

  const resendVerificationEmail = async () => {
    // await resendEmail({
    //   uuid: userData.PK,
    //   type: "verify-email",
    //   body: userData,
    // });   /// use API hook
    console.log("userDatra => ", userData);
    const response = await BuildEmail({
      uuid: userData.PK,
      type: "verify-email",
      body: userData,
    });
    toast.info(response.message);
  };

  return (
    <div>
      {is_sent && (
        <div className="rounded-xl mb-5">
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
        </div>
      )}
      {is_sent ? (
        <div>
          <span className="text-2xl font-bold">Hi {userData.FirstName}!</span>
          <br />
          <span className="text-2xl font-bold">
            We're still waiting for you to confirm your email address.
          </span>
        </div>
      ) : (
        <div>
          <span className="text-2xl font-bold">
            Thank you for registering <br />
            {userData.FirstName}, {userData.CharityName}!
          </span>
          <br />
          <br />
          <span className="text-2xl font-bold">
            Your registration reference is <br />
            <span className="text-orange">{userData.PK || ""}</span>
          </span>
        </div>
      )}
      <div className="my-10">
        {is_sent ? (
          <span className="text-base">
            We have sent you an email to verify your email address(
            {userData.Email}). <br />
            Please follow the link in the email to continue your registration.
          </span>
        ) : (
          <span className="text-base">
            Please click on the link in the email and you'll be able to continue
            with the registration of {userData.CharityName} on Angel.
          </span>
        )}
      </div>
      <div className="mb-2">
        <button
          className="bg-orange w-64 h-12 rounded-xl uppercase text-base font-bold text-white mb-3"
          onClick={resendVerificationEmail}
        >
          Resend verification email
        </button>
      </div>
      <div className="mb-2">
        <button className="bg-yellow-blue w-96 h-12 rounded-xl uppercase text-base font-bold text-white mb-3">
          I'm having trouble with my email
        </button>
      </div>
      <div className="mb-2">
        <button
          className="bg-thin-blue w-48 h-12 rounded-xl uppercase text-base font-bold text-white mb-3"
          onClick={() => history.push("/")}
        >
          close
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmEmail;
