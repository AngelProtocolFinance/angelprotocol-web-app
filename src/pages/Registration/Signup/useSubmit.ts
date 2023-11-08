import { useAuthenticator } from "@aws-amplify/ui-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InitReg } from "../types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import routes from "../routes";

export default function useSubmit() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [register] = useNewApplicationMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const email = user.attributes?.email;
    if (!email) {
      throw new Error("Logged in user has no email attribute");
    }

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
