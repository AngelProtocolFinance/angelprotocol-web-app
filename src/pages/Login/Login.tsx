import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import useLogin from "./useLogin";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  function togglePasswordView() {
    setIsShowPassword((prevState) => !prevState);
  }
  const { tcaToken, isSubmitting, errors, register, login } = useLogin();

  if (tcaToken) {
    return <Navigate to={appRoutes.tca} />;
  }

  return (
    <section className="grid grid-rows-[auto_1fr] place-items-center">
      <div className="rounded-3xl bg-white w-full max-w-lg p-5 sm:p-10 mt-5 shadow-lg">
        <p className="text-3xl sm:text-4.5xl font-bold uppercase text-blue mt-5 sm:mt-10 text-center leading-snug">
          Private access
        </p>
        <div className="text-center my-5 text-gray">
          <p className="text-sm sm:text-base">Access Restricted to</p>
          <p className="text-base sm:text-lg font-bold  text-gray-d2">
            Angel Alliance Members
          </p>
        </div>

        <form className="text-center" onSubmit={login}>
          <div className="my-10 text-left relative">
            <p className="text-sm text-gray font-bold mb-1">Password</p>
            <div className="form-control rounded-md bg-gray-l2 p-2 flex justify-between items-center">
              <input
                {...register("password")}
                type={isShowPassword ? "text" : "password"}
                className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-l2"
                placeholder="Enter your password."
                name="password"
              />
              <button
                onClick={togglePasswordView}
                className="grid place-items-center"
              >
                <Icon
                  type={isShowPassword ? "Eye" : "EyeInvisible"}
                  size={16}
                />
              </button>
            </div>
            <ErrorMessage
              errors={errors}
              name="password"
              as="div"
              className="text-xs sm:text-sm text-red mt-1 pl-1"
            />
          </div>
          <button
            type="submit"
            className="disabled:bg-gray bg-orange hover:bg-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
            disabled={isSubmitting}
          >
            Enter
          </button>
        </form>

        <Link
          to={appRoutes.index}
          className="block w-48 mx-auto my-10 text-center text-blue font-bold text-md uppercase hover:text-blue/75"
        >
          learn more about angel protocol
        </Link>
      </div>
    </section>
  );
};

export default Login;
