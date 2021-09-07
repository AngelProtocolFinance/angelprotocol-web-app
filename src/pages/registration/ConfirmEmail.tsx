import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { useEffect } from "react";

const ConfirmEmail = () => {
  const history = useHistory();
  const firstName = "First Name";
  const charity = "Charity Name";
  useEffect(() => {});

  return (
    <div>
      <div className="rounded-xl mb-5">
        <img src={banner2} width="100%" className="rounded-xl" />
      </div>
      <div>
        <span className="text-2xl font-bold">Hi {firstName}!</span>
        <br />
        <span className="text-2xl font-bold">
          We're still waiting for you to confirm your email address.
        </span>
      </div>
      <div className="my-10">
        <span className="text-xl">
          Please click on the link in the email and you'll be able to continue
          with the registration of {charity} on Angel.
        </span>
      </div>
      <div className="mb-2">
        <button
          className="bg-orange w-64 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => history.push("/register")}
        >
          Resend verification email
        </button>
      </div>
      <div className="mb-2">
        <button
          className="bg-yellow-blue w-96 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => history.push("/register/detail")}
        >
          I'm having trouble with my email
        </button>
      </div>
      <div className="mb-2">
        <button
          className="bg-thin-blue w-48 h-12 rounded-xl uppercase text-md font-bold text-white mb-3"
          onClick={() => history.push("/register/detail")}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
