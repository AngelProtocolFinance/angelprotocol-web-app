import { FormikHelpers } from "formik";
import { Values } from "./Login";
import { useSetToken } from "contexts/AuthProvider";
import { toast } from "react-toastify";
import { aws_endpoint } from "constants/urls";

export default function useLogin() {
  //url = app/login
  const { saveToken } = useSetToken();

  async function handleLogin(values: Values, actions: FormikHelpers<Values>) {
    function resetStatus() {
      actions.resetForm();
      actions.setSubmitting(false);
    }
    //start request
    actions.setSubmitting(true);
    try {
      const response = await fetch(aws_endpoint + "/tca-login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        const data = await response.json();
        //don't perform state update because form would unmount
        saveToken(data.accessToken);
        //no need to push, Redirect/> on Login/> will detect state change and have page redirected
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
