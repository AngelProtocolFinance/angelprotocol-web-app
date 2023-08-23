import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InitReg } from "../types";
import { FormValues } from "./types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
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
    try {
      const res = await register({ email }).unwrap();
      const state: InitReg = {
        email: res.ContactPerson.Email,
        reference: res.ContactPerson.PK,
      };
      navigate(routes.welcome, { state });
    } catch (err) {
      handleError(err);
    }
  }

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
