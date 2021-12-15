import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import eyeIcon from "assets/images/eye.png";
import eyeSlashIcon from "assets/images/eye-slash.png";
import {
  AdminLoginData,
  AdminLoginSchema,
  useAdminLogin,
} from "./useAdminLogin";
import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router-dom";
import { site, admin } from "types/routes";
import { Link } from "react-router-dom";

export type Values = {
  password: string;
};

const AdminLogin = () => {
  const decodedToken = useGetToken();
  const handleLogin = useAdminLogin();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AdminLoginSchema),
    defaultValues: {
      UserName: "",
      Password: "",
    } as AdminLoginData,
  });

  function togglePasswordView() {
    setIsShowPassword((prevState) => !prevState);
  }

  async function onAPLogin(data: AdminLoginData) {
    setIsLoading(true);
    await handleLogin(data);
    setIsLoading(false);
  }

  if (decodedToken?.apToken) {
    return <Redirect to={`${site.admin}/${admin.index_fund_management}`} />;
  }

  return (
    <div className="rounded-xl bg-white w-full max-w-lg p-5 sm:p-10 mt-5 shadow-lg">
      <p className="text-3xl sm:text-4.5xl font-bold uppercase text-thin-blue mt-5 sm:mt-10 text-center leading-snug">
        Login
      </p>
      <form className="text-center" onSubmit={handleSubmit(onAPLogin)}>
        <div className="my-10 text-left relative">
          <p className="text-sm text-gray-400 font-bold mb-1">Username</p>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <input
              {...register("UserName")}
              type="text"
              className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
              placeholder="Enter your username."
              name="UserName"
            />
          </div>
          <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
            {errors.UserName?.message}
          </p>
        </div>
        <div className="my-10 text-left relative">
          <p className="text-sm text-gray-400 font-bold mb-1">Password</p>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <input
              {...register("Password")}
              type={isShowPassword ? "text" : "password"}
              className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
              placeholder="Enter your password."
              name="Password"
            />
            <img
              alt=""
              src={isShowPassword ? eyeIcon : eyeSlashIcon}
              width="16px"
              onClick={togglePasswordView}
            />
          </div>
          <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
            {errors.Password?.message}
          </p>
        </div>
        <button
          type="submit"
          className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
          disabled={isLoading}
        >
          Enter
        </button>
      </form>
      <Link
        to={site.home}
        className="block w-48 mx-auto my-10 text-center text-thin-blue font-bold text-md uppercase hover:text-opacity-75"
      >
        learn more about angel protocol
      </Link>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
