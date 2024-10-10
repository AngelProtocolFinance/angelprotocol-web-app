import { regRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import { toState } from "helpers/state-params";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLazyRegQuery } from "services/aws/registration";
import { getRegistrationState } from "../Steps/getRegistrationState";
import type { FormValues } from "./types";

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
      navigate(
        `../${regRoutes.steps}/${nextStep}?_s=${toState(state.data.init)}`
      );
    } catch (err) {
      handleError(err, { context: "resuming registration" });
    }
  };

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
