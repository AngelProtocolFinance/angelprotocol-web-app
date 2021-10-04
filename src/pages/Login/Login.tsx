import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";
import eyeIcon from "assets/images/eye.png";
import eyeSlashIcon from "assets/images/eye-slash.png";
import useLogin from "./useLogin";
import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router";
import { site, app } from "types/routes";
import { loginSchema } from "./loginSchema";
import { Link } from "react-router-dom";
import Logo from "components/Logo/Logo";

export type Values = {
  password: string;
};

const Login = () => {
  const token = useGetToken();
  console.log("login", token);
  const handleLogin = useLogin();
  const [isShowPassword, setIsShowPassword] = useState(false);
  function togglePasswordView() {
    setIsShowPassword((prevState) => !prevState);
  }

  if (token) {
    return <Redirect to={`${site.app}/${app.tca}`} />;
  }

  return (
    <section className="pb-12 h-screen grid grid-rows-a1 place-items-center">
      <header className="flex items-center justify-between xl:container xl:mx-auto w-full h-24 px-5">
        <Logo />
        <p className="uppercase font-bold text-white font-heading text-lg">
          Give once, give forever
        </p>
      </header>
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

        <Link
          to={site.home}
          className="block w-48 mx-auto my-10 text-center text-thin-blue font-bold text-md uppercase hover:text-opacity-75"
        >
          learn more about angel protocol
        </Link>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
