import { useHistory, useLocation } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { toast, ToastContainer } from "react-toastify";
import Action from "../../components/ActionButton/Action";
import { useGetter, useSetter } from "store/accessors";
import { useRequestEmailMutation } from "services/aws/registration";
import { removeUserData, updateUserData } from "services/user/userSlice";

const ConfirmEmail = () => {
  const history = useHistory();
  const dispatch = useSetter();
  let user = useGetter((state) => state.user);
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  //eslint-disable-next-line
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const resendVerificationEmail = async () => {
    if (user.PK) {
      const response: any = await resendEmail({
        uuid: user.PK,
        type: "verify-email",
        body: user,
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

  if (!user.PK) {
    user = JSON.parse(localStorage.getItem("userData") || "{}");
    dispatch(updateUserData(user));
  }

  return (
    <div>
      {is_sent && (
        <div className="rounded-xl mb-5">
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
        </div>
      )}
      {is_sent ? (
        <div>
          <p className="text-4xl font-bold">Hi {user.FirstName}!</p>
          <span className="text-4xl font-bold">
            We're still waiting for you to confirm your email address.
          </span>
        </div>
      ) : (
        <div>
          <p className="text-2xl font-bold">Thank you for registering</p>
          <p className="text-2xl font-bold mb-10">
            {user.FirstName}, {user.CharityName}!{" "}
          </p>
          <p className="text-2xl font-bold">Your registration reference is</p>
          <p className="text-orange text-2xl font-bold">{user.PK || ""}</p>
        </div>
      )}
      <div className="mt-3 mb-10">
        <span className="text-base">
          Please click on the link in the email and you'll be able to continue
          with the registration of {user.CharityName} on Angel.
        </span>
      </div>
      <div className="mb-2">
        <Action
          onClick={resendVerificationEmail}
          classes="bg-orange w-64 h-12 text-sm"
          title="Resend verification email"
          isLoading={isLoading}
        />
      </div>
      <div className="mb-2">
        <Action
          onClick={resendVerificationEmail}
          title="I'm having trouble with my email"
          classes="bg-yellow-blue w-96 h-12 text-sm"
        />
      </div>
      <div className="mb-2">
        <Action
          onClick={returnMain}
          title="close"
          classes="bg-thin-blue w-48 h-12 text-sm"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmEmail;
