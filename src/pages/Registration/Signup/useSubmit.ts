import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InitReg } from "../types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useAuthenticatedUser } from "contexts/Auth";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import routes from "../routes";

export default function useSubmit() {
  const { email } = useAuthenticatedUser();
  const [register] = useNewApplicationMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    try {
      setIsSubmitting(true);
      const res = await register({ email }).unwrap();
      const state: InitReg = {
        email: res.ContactPerson.Email,
        reference: res.ContactPerson.PK,
      };
      storeRegistrationReference(state.reference);
      navigate(routes.welcome, { state });
    } catch (err) {
      handleError(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { handleSubmit, isSubmitting };
}
