import { yupResolver } from "@hookform/resolvers/yup";
import { AuthError, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { Form } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { object } from "yup";
import Field from "../Field";
import { CodeRecipientEmail, StateSetter, UserType } from "../types";
import ResendOTPTimer from "./ResendOTPTimer";

type Props = {
  codeRecipientEmail: CodeRecipientEmail;
  setSignupState: StateSetter;
  classes?: string;
  userType: UserType;
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

  const submit = async (fv: FV) => {
    try {
      const result = await confirmSignUp({
        username: props.codeRecipientEmail.raw,
        confirmationCode: fv.code,
      });

      if (result.nextStep.signUpStep !== "DONE" || !result.isSignUpComplete) {
        return handleError("Code confirmation failed");
      }

      props.setSignupState({ type: "success", userType: props.userType });
    } catch (err) {
      const message =
        err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
      handleError(message);
    }
  };

  const resendOTP = async () => {
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
  };

  return (
    <Form
      className={`${props.classes ?? ""} grid text-[#1D3C51]`}
      disabled={isSubmitting || isRequestingNewCode}
      methods={methods}
      onSubmit={handleSubmit(submit)}
    >
      <h3 className="text-center text-2xl font-bold text-navy-d4">
        Verify your account
      </h3>
      <p className="text-center font-normal mt-2">
        You’re almost there! 6-digit security code has been sent to{" "}
        <span className="font-medium">{props.codeRecipientEmail.obscured}</span>
      </p>
      <Field<FV>
        name="code"
        placeholder="Enter 6-digit code"
        classes={{ container: "my-6" }}
      />
      <button
        type="submit"
        className="flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-[52px] rounded-full normal-case text-lg font-bold w-full"
      >
        Verify account
      </button>

      <span className="grid grid-cols-[4fr_3fr] items-center justify-items-start gap-1 text-sm font-medium mt-5">
        <span className="justify-self-end">Resend code in</span>
        <ResendOTPTimer onClick={resendOTP} />
      </span>
    </Form>
  );
}
