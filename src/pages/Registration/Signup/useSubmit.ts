import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./types";
import { InitReg } from "services/types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { handleMutationResult } from "helpers";
import routes from "../routes";

export default function useSubmit() {
  const [register] = useNewApplicationMutation();
  const { handleError } = useErrorContext();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();
  const navigate = useNavigate();

  async function onSubmit({ email }: FormValues) {
    handleMutationResult(await register({ email }), handleError, (res) => {
      const state: InitReg = {
        email: res.ContactPerson.Email,
        reference: res.ContactPerson.PK,
        isEmailVerified: false,
        lastVerified: res.ContactPerson.EmailVerificationLastSentDate,
      };
      navigate(routes.confirmEmail, { state });
    });
  }

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
