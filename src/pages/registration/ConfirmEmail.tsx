import { useHistory, useLocation } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { register_routes } from "types/types";

const ConfirmEmail = () => {
  const history = useHistory();
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const userData: any = JSON.parse(localStorage.getItem("userData") || "{}"); // remove this when using Redux in the future

  return (
    <div>
      {is_sent && (
        <div className="rounded-xl mb-5">
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
        </div>
      )}
      {is_sent ? (
        <div>
          <span className="text-2xl font-bold">Hi {userData.firstName}!</span>
          <br />
          <span className="text-2xl font-bold">
            We're still waiting for you to confirm your email address.
          </span>
        </div>
      ) : (
        <div>
          <span className="text-2xl font-bold">
            Thank you for registering <br />
            {userData.firstName}, {userData.charityName}!
          </span>
          <br />
          <br />
          <span className="text-2xl font-bold">
            Your registration reference is <br />
            <span className="text-orange">{userData.uniqueID || ""}</span>
          </span>
        </div>
      )}
      <div className="my-10">
        {is_sent ? (
          <span className="text-base">
            We have sent you an email to verify your email address. <br />
            Please follow the link in the email to continue your registration.
          </span>
        ) : (
          <span className="text-base">
            Please click on the link in the email and you'll be able to continue
            with the registration of {userData.charityName} on Angel.
          </span>
        )}
      </div>
      <div className="mb-2">
        <button
          className="bg-orange w-64 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => console.log("click resend button.")}
        >
          Resend verification email
        </button>
      </div>
      <div className="mb-2">
        <button className="bg-yellow-blue w-96 h-12 rounded-xl uppercase text-md font-bold text-white mb-3">
          I'm having trouble with my email
        </button>
      </div>
      <div className="mb-2">
        <button
          className="bg-thin-blue w-48 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => history.push(register_routes.detail)}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
