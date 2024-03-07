import { yupResolver } from "@hookform/resolvers/yup";
import {
  AuthError,
  confirmResetPassword,
  resetPassword,
} from "aws-amplify/auth";
import { Form, Input, PasswordInput } from "components/form";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import useCounter from "hooks/useCounter";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { password, requiredString } from "schemas/string";
import { object, ref } from "yup";
import { CodeRecipientEmail, StepSetter } from "./types";

const MAX_TIME = 30;

type Props = {
  codeRecipientEmail: CodeRecipientEmail;
  setStep: StepSetter;
};

export default function SetPasswordForm(props: Props) {
  const { handleError } = useErrorContext();
  const [isRequestingNewCode, setIsRequestingNewCode] = useState(false);
  const methods = useForm({
    resolver: yupResolver(
      object({
        code: requiredString,
        password: password,
        passwordConfirmation: requiredString.oneOf(
          [ref("password"), ""],
          "Passwords must match"
        ),
      })
    ),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  const { counter, resetCounter } = useCounter(MAX_TIME);

  async function submit(fv: FV) {
    try {
      await confirmResetPassword({
        username: props.codeRecipientEmail.raw,
        confirmationCode: fv.code,
        newPassword: fv.password,
      });

      props.setStep({ type: "success" });
    } catch (err) {
      const message =
        err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
      handleError(err, message, { log: !(err instanceof AuthError) });
    }
  }

  const resendOTP = async () => {
    try {
      setIsRequestingNewCode(true);

      const { nextStep } = await resetPassword({
        username: props.codeRecipientEmail.raw,
      });

      //per cognito config
      if (nextStep.resetPasswordStep !== "CONFIRM_RESET_PASSWORD_WITH_CODE")
        throw `Unexpected next reset password step: ${nextStep.resetPasswordStep}`;
      if (nextStep.codeDeliveryDetails.deliveryMedium !== "EMAIL")
        throw `Unexpected code delivery medium: ${nextStep.codeDeliveryDetails.deliveryMedium}`;
      if (!nextStep.codeDeliveryDetails.destination)
        throw `Missing code delivery destination`;

      resetCounter();

      alert("New code has been sent to your email.");
    } catch (err) {
      const message =
        err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
      handleError(err, message, { log: !(err instanceof AuthError) });
    } finally {
      setIsRequestingNewCode(false);
    }
  };

  return (
    <Form
      className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl"
      disabled={isSubmitting || isRequestingNewCode}
      methods={methods}
      onSubmit={handleSubmit(submit)}
    >
      <h3 className="text-center text-xl sm:text-2xl font-bold text-navy-d4">
        Set new password
      </h3>
      <p className="text-center font-normal max-sm:text-sm mt-2">
        6-digit security code has been sent to{" "}
        <span className="font-medium">{props.codeRecipientEmail.obscured}</span>
        .{" "}
        <button
          type="button"
          className="text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray-l2 font-bold underline hover:cursor-pointer"
          onClick={() => props.setStep({ type: "init" })}
        >
          Edit email
        </button>
      </p>

      <div className="mt-6 grid gap-3">
        <Input<FV>
          name="code"
          placeholder="Enter 6-digit code"
          autoComplete="one-time-code"
        />

        <span className="mb-3 flex items-center justify-between text-sm font-medium">
          <span>Time remaining: 00:{String(counter).padStart(2, "0")}</span>
          <button
            type="button"
            className="text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray-l2 font-bold underline"
            onClick={resendOTP}
            disabled={counter > 0}
          >
            Resend code
          </button>
        </span>

        <PasswordInput<FV> name="password" placeholder="New Password" />
        <PasswordInput<FV>
          name="passwordConfirmation"
          placeholder="Confirm New Password"
        />
      </div>

      <p className="mt-6 font-normal text-xs sm:text-[13px] leading-5">
        In order to protect your account, make sure your password:
        <ul className="list-disc list-inside">
          <li className="ml-2">Has at least 8 characters</li>
          <li className="ml-2">Contains at least 1 number</li>
          <li className="ml-2">Contains at least 1 special character</li>
          <li className="ml-2">Contains at least 1 uppercase letter</li>
          <li className="ml-2">Contains at least 1 lowercase letter</li>
        </ul>
      </p>

      <button
        type="submit"
        className="mt-6 w-full h-12 sm:h-[52px] flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 rounded-full normal-case sm:text-lg font-bold"
      >
        Confirm
      </button>
    </Form>
  );
}
