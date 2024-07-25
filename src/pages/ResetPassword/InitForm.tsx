import { yupResolver } from "@hookform/resolvers/yup";
import { AuthError, resetPassword } from "aws-amplify/auth";
import { Form, Input } from "components/form";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { type UseFormReturn, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { requiredString } from "schemas/string";
import { object } from "yup";
import type { StepSetter } from "./types";

type Props = {
  setStep: StepSetter;
};

export default function InitForm(props: Props) {
  const { handleError, displayError } = useErrorContext();
  const methods = useForm({
    resolver: yupResolver(
      object({ email: requiredString.trim().email("invalid email format") })
    ),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  type FV = typeof methods extends UseFormReturn<infer U> ? U : never;

  // pass this if navigating back to Login
  const { state } = useLocation();

  async function submit(fv: FV) {
    try {
      const { nextStep } = await resetPassword({ username: fv.email });

      //per cognito config
      if (nextStep.resetPasswordStep !== "CONFIRM_RESET_PASSWORD_WITH_CODE")
        throw `Unexpected next reset password step: ${nextStep.resetPasswordStep}`;
      if (nextStep.codeDeliveryDetails.deliveryMedium !== "EMAIL")
        throw `Unexpected code delivery medium: ${nextStep.codeDeliveryDetails.deliveryMedium}`;
      if (!nextStep.codeDeliveryDetails.destination)
        throw `Missing code delivery destination`;

      props.setStep({
        type: "set-password",
        codeRecipientEmail: {
          raw: fv.email,
          obscured: nextStep.codeDeliveryDetails.destination,
        },
      });
    } catch (err) {
      if (err instanceof AuthError) {
        return displayError(err.message);
      }
      handleError(err, { context: "resetting password" });
    }
  }

  return (
    <Form
      className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl"
      disabled={isSubmitting}
      onSubmit={handleSubmit(submit)}
    >
      <h3 className="text-center text-xl sm:text-2xl font-bold text-navy-d4">
        Reset your Password
      </h3>
      <p className="mt-2 text-center font-normal max-sm:text-sm">
        Enter your registered email to reset password
      </p>

      <Input
        {...register("email")}
        placeholder="Email address"
        classes={{ container: "mt-6" }}
        icon="Email"
        error={errors.email?.message}
      />

      <button
        type="submit"
        className="mt-6 w-full h-12 sm:h-[52px] flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 rounded-full normal-case sm:text-lg font-bold"
      >
        Send Code
      </button>

      <Link
        to={appRoutes.signin}
        state={state}
        className="mt-5 text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray max-sm:text-sm font-medium underline text-center"
        aria-disabled={isSubmitting}
      >
        Back to Sign in
      </Link>
    </Form>
  );
}
