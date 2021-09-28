import { FormikHelpers } from "formik";
import { Values } from "./Login";
import { useSetToken } from "contexts/AuthProvider";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch } from "react-router-dom";
import { app, site } from "types/routes";

const endPoint =
  "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com/tca-login";

export default function useLogin() {
  //url = app/login
  const { url } = useRouteMatch();
  const { saveToken } = useSetToken();
  const history = useHistory();

  async function handleLogin(values: Values, actions: FormikHelpers<Values>) {
    function resetStatus() {
      actions.resetForm();
      actions.setSubmitting(false);
    }
    //start request
    actions.setSubmitting(true);
    try {
      const response = await fetch(endPoint, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        const data = await response.json();
        //don't perform state update because form would unmount
        saveToken(data.accessToken);
        history.push(`${site.app}/${app.tca}`);
      } else if (response.status === 403) {
        toast.error("Unauthorized");
        resetStatus();
      } else {
        toast.error("Something went wrong");
        resetStatus();
      }
    } catch (error) {
      toast.error("Something went wrong");
      resetStatus();
    }
  }

  return handleLogin;
}
