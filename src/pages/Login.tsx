import { useState } from "react";
import { TCAAuthProcess } from "aws-settings.config";

import eyeIcon from "assets/images/eye.png";
import eyeSlashIcon from "assets/images/eye-slash.png";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const enterPassword = (event: any) => {
    event.preventDefault();
    setPassword(event.target.value);
    TCAAuthProcess(event.target.value);
  };

  return (
    <section className="container mx-auto my-auto flex-auto my-10 lg:w-1/4 w-1/2 h-fixed-content-height">
      <div className="login-form absolute min-w-dm inset-1/2 bottom-auto right-auto rounded-3xl bg-white transform -translate-x-1/2 -translate-y-1/2 w-96 md:w-2/5 lg:w-1/3 max-w-lg p-10">
        <p className="header-title text-4.5xl font-bold uppercase text-thin-blue mt-10 text-center">
          Private access
        </p>
        <div className="text-center my-5 text-gray-400">
          <p className="text-md">Access Restricted to</p>
          <p className="text-lg font-bold">Terra Charity Alliance Members</p>
        </div>
        <div className="my-10 text-start">
          <p className="text-sm text-gray-400 font-bold">Password</p>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <input
              type={isShowPassword ? "text" : "password"}
              name="password"
              className="text-md mr-1 bg-gray-200 outline-none border-none w-4/5"
              value={password}
              onChange={enterPassword}
            />
            <img
              alt=""
              src={isShowPassword ? eyeIcon : eyeSlashIcon}
              width="16px"
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          </div>
        </div>
        <div className="text-center my-10">
          <button
            className="bg-orange text-center w-48 h-16 rounded-xl uppercase text-md font-bold text-white"
            disabled={!password}
            onClick={enterPassword}
          >
            enter
          </button>
        </div>
        <div className="text-center my-10">
          <p className="text-thin-blue font-bold text-xl uppercase">
            learn more about
          </p>
          <p className="text-thin-blue font-bold text-xl uppercase">
            angel protocol
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
