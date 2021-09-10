import { FormikHelpers } from "formik";
import { Values } from "./Login";
import { useSetToken } from "contexts/AuthProvider";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { routes } from "types/types";

const url = "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/tca-login";

export default function useLogin() {
  const { saveToken } = useSetToken();
  const history = useHistory();

  function handleLogin(values: Values, actions: FormikHelpers<Values>) {
    //when this handler run, isSubmitting is set to true automatically
    fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          toast.error("Unauthorized");
        } else {
          //error is other than 403
          toast.error("Something went wrong");
        }
      })
      .then((jsonData) => {
        saveToken(jsonData.accessToken);
        history.replace(routes.tca);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        actions.resetForm();
        actions.setSubmitting(false);
      });
  }

  function validator(values: Values) {
    const errors = { password: "" };
    if (!values.password) {
      errors.password = "Please enter your password.";
    } else {
      return {};
    }
    return errors;
  }

  return { validator, handleLogin };
}
