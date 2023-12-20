import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./types";
import { useLazyRegQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { regRoutes } from "constants/routes";
import { getRegistrationState } from "../Steps/getRegistrationState";

export default function useSubmit() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const navigate = useNavigate();
  const { handleError } = useErrorContext();
  const [checkPrevRegistration] = useLazyRegQuery();

  const onSubmit = async ({ reference }: FormValues) => {
    try {
      const { isError, error, data } = await checkPrevRegistration(reference);
      if (isError || !data) {
        handleError(
          error,
          "No active application found with this registration reference"
        );
        return;
      }
      storeRegistrationReference(reference);

      const { state, nextStep } = getRegistrationState(data);
      const init = state.data.init;

      navigate(`../${regRoutes.steps}/${nextStep}`, { state: init });
    } catch (err) {
      handleError(err);
    }
  };

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
