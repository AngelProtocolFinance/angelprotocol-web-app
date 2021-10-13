import { useHistory, useLocation } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "Redux/store";
import { useRequestEmailMutation } from "api/registerAPIs";
import { toast, ToastContainer } from "react-toastify";
import { UserSlice } from "Redux/slices/userSlice";
import CustomButton from "components/CustomButton/CustomButton";

const ConfirmEmail = () => {
  //url = /app/register/confirm
  const history = useHistory();
  const dispatch = useDispatch();
  const { removeUserData } = UserSlice.actions;
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const { userData } = useSelector((state: TStore) => state.user);
  const [resendEmail, { isLoading }] = useRequestEmailMutation();

  const resendVerificationEmail = async () => {
    if (userData.PK) {
      const response: any = await resendEmail({
        uuid: userData.PK,
        type: "verify-email",
        body: userData,
      });
      response.data
        ? toast.info(response.data?.message)
        : toast.error(response.error?.data.message);
    } else {
      toast.error("Invalid Data. Please ask the administrator about that.");
    }
  };

  const returnMain = () => {
    dispatch(removeUserData());
    history.push("/");
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
        <CustomButton
          activeColor="orange"
          onClickEvent={resendVerificationEmail}
          title="Resend verification email"
          width={64}
          height={12}
          margin="mb-3"
        />
      </div>
      <div className="mb-2">
        <CustomButton
          activeColor="yellow-blue"
          onClickEvent={resendVerificationEmail}
          title="I'm having trouble with my email"
          width={96}
          height={12}
          margin="mb-3"
        />
      </div>
      <div className="mb-2">
        <CustomButton
          activeColor="thin-blue"
          onClickEvent={returnMain}
          title="close"
          width={48}
          height={12}
          margin="mb-3"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmEmail;
