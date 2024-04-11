import { regRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLazyRegQuery } from "services/aws/registration";
import { getRegistrationState } from "../Steps/getRegistrationState";
import { FormValues } from "./types";

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
      if (isError || !data) return handleError(error, "parsed");

      storeRegistrationReference(reference);

      const { state, nextStep } = getRegistrationState(data);
      const init = state.data.init;

      navigate(`../${regRoutes.steps}/${nextStep}`, { state: init });
    } catch (err) {
      handleError(err, { context: "resuming registration" });
    }
  };

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
