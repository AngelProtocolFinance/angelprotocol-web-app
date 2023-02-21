import { useErrorContext } from "@ap/contexts/error-context";
import { storeRegistrationReference } from "@ap/helpers";
import { useLazyRegQuery } from "@ap/services/aws";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./types";
import { getRegistrationState } from "../Steps/getRegistrationState";
import routes from "../routes";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [checkPrevRegistration] = useLazyRegQuery();

  const onSubmit = async ({ reference }: FormValues) => {
    const { isError, error, data } = await checkPrevRegistration(reference);
    if (isError || !data) {
      handleError(
        error,
        "No active application found with this registration reference"
      );
      return;
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
