import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";

import eyeIcon from "assets/images/eye.png";
import eyeSlashIcon from "assets/images/eye-slash.png";
import useLogin from "./useLogin";
import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router";
import { routes } from "types/types";
import { loginSchema } from "./loginSchema";

export type Values = {
  password: string;
};

const Login = () => {
  const token = useGetToken();
  const handleLogin = useLogin();
  const [isShowPassword, setIsShowPassword] = useState(false);
  function togglePasswordView() {
    setIsShowPassword((prevState) => !prevState);
  }

  if (token) {
    return <Redirect to={routes.home} />;
  }

  return (
    <section className="p-5 pt-24 h-screen grid place-items-center ">
      <div className="rounded-3xl bg-white w-full max-w-lg p-5 sm:p-10 mt-5 shadow-lg">
        <p className="text-3xl sm:text-4.5xl font-bold uppercase text-thin-blue mt-5 sm:mt-10 text-center leading-snug">
          Private access
        </p>
        <div className="text-center my-5 text-gray-400">
          <p className="text-sm sm:text-base">Access Restricted to</p>
          <p className="text-base sm:text-lg font-bold  text-angel-grey">
            Terra Charity Alliance Members
          </p>
        </div>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, status }) => (
            <Form className="text-center">
              <div className="my-10 text-left relative">
                {status}
                <p className="text-sm text-gray-400 font-bold mb-1">Password</p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <Field
                    type={isShowPassword ? "text" : "password"}
                    className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
                    placeholder="Enter your password."
                    name="password"
                  />
                  <img
                    alt=""
                    src={isShowPassword ? eyeIcon : eyeSlashIcon}
                    width="16px"
                    onClick={togglePasswordView}
                  />
                </div>
                <ErrorMessage
                  className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                  name="password"
                  component="div"
                />
              </div>
              <button
                type="submit"
                className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
                disabled={isSubmitting}
              >
                Enter
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center my-10">
          <p className="text-thin-blue font-bold text-base uppercase">
            learn more about
          </p>
          <p className="text-thin-blue font-bold text-base uppercase">
            angel protocol
          </p>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
