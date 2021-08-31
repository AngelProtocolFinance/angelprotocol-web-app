import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { TCAAuthProcess } from "aws-settings.config";

import useRequest from "hooks/useRequest";
import { API_URLS } from "constants/urls";
import eyeIcon from "assets/images/eye.png";
import eyeSlashIcon from "assets/images/eye-slash.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { doRequest, errors } = useRequest({
    url: API_URLS["TCA_login"],
    method: "post",
    body: {},
    onSuccess: (data: any) => {
      setLoading(false);
      return data;
    },
    onFailed: (err: any) => {
      console.log(err);
      setLoading(false);
    },
  });

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
        <Formik
          initialValues={{ password: "" }}
          validate={(values) => {
            const errors = { password: "" };
            if (!values.password) {
              errors.password = "Please enter password.";
              return errors;
            }
            return {};
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            setLoading(true);
            setSubmitting(true);
            const res = await doRequest({ password: values.password });
            console.log("response => ", res);
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form className="text-center">
              <div className="my-10 text-left">
                <p className="text-sm text-gray-400 font-bold mb-1">Password</p>
                <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                  <Field
                    type={isShowPassword ? "text" : "password"}
                    className="outline-none border-none w-full px-3 bg-gray-200"
                    placeholder="Enter your password."
                    value={values.password}
                    name="password"
                  />
                  <img
                    alt=""
                    src={isShowPassword ? eyeIcon : eyeSlashIcon}
                    width="16px"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
                <ErrorMessage
                  className="text-sm text-failed-red"
                  name="password"
                  component="div"
                />
              </div>
              <button
                type="submit"
                className="bg-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white"
                disabled={loading || isSubmitting}
              >
                enter
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center my-10">
          <p className="text-thin-blue font-bold text-md uppercase">
            learn more about
          </p>
          <p className="text-thin-blue font-bold text-md uppercase">
            angel protocol
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
