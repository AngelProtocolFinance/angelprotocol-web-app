import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InitReg } from "../types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "slices/auth";
import { storeRegistrationReference } from "helpers";
import routes from "../routes";

export default function useSubmit() {
  const user = useGetter((state) => state.auth.user);
  const [register] = useNewApplicationMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useErrorContext();
  const navigate = useNavigate();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!userIsSignedIn(user)) {
      throw new Error("Logged in user has no email attribute");
    }

    try {
      setIsSubmitting(true);
      const res = await register({ email: user.id }).unwrap();
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
