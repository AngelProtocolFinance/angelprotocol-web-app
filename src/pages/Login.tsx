import { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import eyeIcon from "assets/images/eye.png";
import eyeSlashIcon from "assets/images/eye-slash.png";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const enterPassword = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="bg-blue-400 h-screen">
      <Header
        hasMenu={false}
        hasTitle={true}
        onConnect={() => {}}
        onDisconnect={() => {}}
      />
      <section className="container mx-auto my-auto flex-auto my-10 w-1/4">
        <div className="login-form bg-white rounded-20 p-20 text-center">
          <p className="header-title text-2xl text-bold uppercase text-thin-blue">
            Private access
          </p>
          <div className="text-center my-5">
            <p className="text-md">Access Restricted to</p>
            <p className="text-lg text-bold">Terra Charity Alliance Members</p>
          </div>
          <div className="my-10 text-start">
            <p className="text-xs">Password</p>
            <div className="form-control rounded-5 bg-grey p-2 flex justify-between items-center">
              <input
                type={isShowPassword ? "password" : "text"}
                name="password"
                className="outline-0 text-md mr-1"
                value={password}
                onChange={enterPassword}
              />
              <img
                src={isShowPassword ? eyeIcon : eyeSlashIcon}
                width="16px"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </div>
          </div>
          <div className="text-center my-10">
            <button
              className="bg-orange text-center w-48 h-16 rounded-15 uppercase font-md"
              disabled={!password}
            >
              enter
            </button>
          </div>
          <div className="text-center my-10">
            <p className="text-thin-blue text-bold font-lg uppercase">
              learn more about
            </p>
            <p className="text-thin-blue text-bold font-lg uppercase">
              angel protocol
            </p>
          </div>
        </div>
      </section>
      <Footer hasMenu={false} />
    </div>
  );
};

export default Login;
