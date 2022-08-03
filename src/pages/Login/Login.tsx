import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import eyeSlashIcon from "assets/images/eye-slash.png";
import eyeIcon from "assets/images/eye.png";
import { appRoutes, siteRoutes } from "constants/routes";
import useLogin from "./useLogin";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  function togglePasswordView() {
    setIsShowPassword((prevState) => !prevState);
  }
  const { tcaToken, isSubmitting, errors, register, login } = useLogin();

  if (tcaToken) {
    return <Navigate to={`${appRoutes.tca}`} />;
  }

  return (
    <section className="grid grid-rows-a1 place-items-center">
      <div className="rounded-3xl bg-white w-full max-w-lg p-5 sm:p-10 mt-5 shadow-lg">
        <p className="text-3xl sm:text-4.5xl font-bold uppercase text-thin-blue mt-5 sm:mt-10 text-center leading-snug">
          Private access
        </p>
        <div className="text-center my-5 text-gray-400">
          <p className="text-sm sm:text-base">Access Restricted to</p>
          <p className="text-base sm:text-lg font-bold  text-angel-grey">
            Angel Alliance Members
          </p>
        </div>

        <form className="text-center" onSubmit={login}>
          <div className="my-10 text-left relative">
            <p className="text-sm text-gray-400 font-bold mb-1">Password</p>
            <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
              <input
                {...register("password")}
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
              errors={errors}
              name="password"
              as="div"
              className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
            />
          </div>
          <button
            type="submit"
            className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
            disabled={isSubmitting}
          >
            Enter
          </button>
        </form>

        <Link
          to={siteRoutes.index}
          className="block w-48 mx-auto my-10 text-center text-thin-blue font-bold text-md uppercase hover:text-thin-blue/75"
        >
          learn more about angel protocol
        </Link>
      </div>
    </section>
  );
};

export default Login;
