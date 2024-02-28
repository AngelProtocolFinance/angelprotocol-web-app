import { yupResolver } from "@hookform/resolvers/yup";
import { AuthError, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { Field, Form } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { object } from "yup";
import { CodeRecipientEmail, StateSetter } from "./types";

type Props = {
  codeRecipientEmail: CodeRecipientEmail;
  setSignupState: StateSetter;
  classes?: string;
};
export default function ConfirmForm(props: Props) {
  const { handleError } = useErrorContext();
  const [isRequestingNewCode, setIsRequestingNewCode] = useState(false);
  const methods = useForm({
    resolver: yupResolver(object({ code: requiredString })),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  return (
    <Form
      className={`${props.classes ?? ""} grid`}
      disabled={isSubmitting || isRequestingNewCode}
      methods={methods}
      onSubmit={handleSubmit(async (fv) => {
        try {
          const result = await confirmSignUp({
            username: props.codeRecipientEmail.raw,
            confirmationCode: fv.code,
          });

          if (
            result.nextStep.signUpStep !== "DONE" ||
            !result.isSignUpComplete
          ) {
            return handleError("Code confirmation failed");
          }

          props.setSignupState("success");
        } catch (err) {
          const message =
            err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
          handleError(message);
        }
      })}
    >
      <p>We emailed you a confirmation code.</p>
      <p className="text-sm text-gray-d1 mt-1 mb-4">
        To continue, enter the code we emailed to{" "}
        <span className="font-medium">{props.codeRecipientEmail.obscured}</span>
        . It may take a couple of minutes to arrive.
      </p>
      <Field<FV> name="code" label="Confirmation code" required />
      <button
        type="submit"
        className="btn-blue px-4 py-2 rounded-full normal-case mt-6"
      >
        Confirm
      </button>
      <button
        type="button"
        className="btn-outline px-4 py-2 rounded-full normal-case mt-3"
        onClick={async () => {
          try {
            setIsRequestingNewCode(true);
            //no need to inspect result
            await resendSignUpCode({
              username: props.codeRecipientEmail.raw,
            });

            return alert("New code has been sent to your email.");
          } catch (err) {
            const message =
              err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
            handleError(message);
          } finally {
            setIsRequestingNewCode(false);
          }
        }}
      >
        Resend code
      </button>
    </Form>
  );
}
