import { useNewApplicationMutation } from "@/services/aws/registration";
import { useErrorContext } from "@ap/contexts";
import { handleMutationResult } from "@ap/helpers";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InitReg } from "../types";
import { FormValues } from "./types";
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
