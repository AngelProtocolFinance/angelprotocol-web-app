import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./types";
import { useLazyRegQuery } from "services/aws/registration";
import useErrorHandler from "hooks/useErrorHandler";
import { storeRegistrationReference } from "helpers";
import { getRegistrationState } from "../Steps/getRegistrationState";
import routes from "../routes";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const navigate = useNavigate();
  const { handleError } = useErrorHandler("Resume registration");
  const [checkPrevRegistration] = useLazyRegQuery();

  const onSubmit = async ({ reference }: FormValues) => {
    const { error, data } = await checkPrevRegistration(reference);
    if (error) return handleError(error);
    if (!data) {
      return handleError(
        "No active application found with this registration reference"
      );
    }

    storeRegistrationReference(reference);

    const state = getRegistrationState(data);
    const init = state.data.init;

    if ("data" in state && !state.data.init.isEmailVerified) {
      return navigate(`../${routes.confirmEmail}`, { state: init });
    }

    navigate(`../${routes.steps}/${state.step}`, { state: init });
  };

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
