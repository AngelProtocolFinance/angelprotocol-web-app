import { useAuthenticator } from "@aws-amplify/ui-react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InitReg } from "../types";
import { FormValues } from "./types";
import { useNewApplicationMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { storeRegistrationReference } from "helpers";
import routes from "../routes";

export default function useSubmit() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [register] = useNewApplicationMutation();
  const { handleError } = useErrorContext();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();
  const navigate = useNavigate();

  async function onSubmit() {
    const email = user.attributes?.email;
    if (!email) {
      throw new Error("Logged in user has no email attribute");
    }

    try {
      const res = await register({ email }).unwrap();
      const state: InitReg = {
        email: res.ContactPerson.Email,
        reference: res.ContactPerson.PK,
      };
      storeRegistrationReference(state.reference);
      navigate(routes.welcome, { state });
    } catch (err) {
      handleError(err);
    }
  }

  return { submit: handleSubmit(onSubmit), isSubmitting };
}
