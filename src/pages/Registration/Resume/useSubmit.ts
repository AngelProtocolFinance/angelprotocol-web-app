import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./types";
import { useLazyRegQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
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
    const {
      isError,
      error,
      data: regState,
    } = await checkPrevRegistration(reference);
    if (isError || !regState) {
      handleError(
        error,
        "No active application found with this registration reference"
      );
      return;
    }
    storeRegistrationReference(reference);

    const state = regState.data.init;

    if ("data" in regState && !regState.data.init.isEmailVerified) {
      return navigate(`../${routes.confirmEmail}`, { state });
    }

    navigate(`../${routes.steps}/${regState.step}`, { state });
  };

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
