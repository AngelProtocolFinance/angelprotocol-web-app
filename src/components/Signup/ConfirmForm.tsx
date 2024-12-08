import { yupResolver } from "@hookform/resolvers/yup";
import { cognito } from "auth/cognito";
import { Field, RhfForm } from "components/form";
import { useErrorContext } from "contexts/ErrorContext";
import { useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { isError } from "types/auth";
import { object } from "yup";
import type { CodeRecipientEmail, StateSetter } from "./types";

type Props = {
  codeRecipientEmail: CodeRecipientEmail;
  setSignupState: StateSetter;
  classes?: string;
};
export default function ConfirmForm(props: Props) {
  const { handleError, displayError } = useErrorContext();
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
    <RhfForm
      className={`${props.classes ?? ""} grid`}
      disabled={isSubmitting || isRequestingNewCode}
      methods={methods}
      onSubmit={handleSubmit(async (fv) => {
        try {
          const res = await cognito.confirmSignup(
            props.codeRecipientEmail.raw,
            fv.code
          );

          if (isError(res)) return displayError(res.message);

          props.setSignupState("success");
        } catch (err) {
          handleError(err, { context: "confirming signup" });
        }
      })}
    >
      <p className="text-blue-d2 font-medium">
        We emailed you a confirmation code.
      </p>
      <p className="text-sm text-gray-d1 mt-1 mb-4">
        To continue, enter the code we emailed to{" "}
        <span className="font-medium">{props.codeRecipientEmail.obscured}</span>
        . It may take a couple of minutes to arrive.
      </p>
      <Field<FV> name="code" label="Confirmation code" required />
      <button
        type="submit"
        className="btn-blue h-[3.25rem] font-heading rounded-full normal-case mt-6"
      >
        Confirm
      </button>
      <button
        type="button"
        className="btn-outline rounded-full normal-case mt-3 h-[3.25rem] font-heading"
        onClick={async () => {
          try {
            setIsRequestingNewCode(true);
            //no need to inspect result
            const res = await cognito.resendConfirmationCode(
              props.codeRecipientEmail.raw
            );
            if (isError(res)) displayError(res.message);

            return alert("New code has been sent to your email.");
          } catch (err) {
            handleError(err, { context: "sending code" });
          } finally {
            setIsRequestingNewCode(false);
          }
        }}
      >
        Resend code
      </button>
    </RhfForm>
  );
}
