import { yupResolver } from "@hookform/resolvers/yup";
import { AuthError, signUp } from "aws-amplify/auth";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { useErrorContext } from "contexts/ErrorContext";
import { FormProvider, useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { mixed, object } from "yup";
import { FormValues, StateSetter, UserType } from "../types";
import FormFields from "./FormFields";

type Props = {
  setSignupState: StateSetter;
  classes?: string;
};

export default function SignupForm(props: Props) {
  const { handleError } = useErrorContext();
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      object({
        email: requiredString.trim().email("invalid email format"),
        firstName: requiredString.trim(),
        lastName: requiredString.trim(),
        userType: mixed<UserType>()
          .required("required")
          .oneOf(["donor", "non-profit"]),
        password: requiredString
          .min(8, ({ min }) => `must have at least ${min} characters`)
          .matches(/[a-z]/, "must have lowercase letters")
          .matches(/[A-Z]/, "must have uppercase letters")
          .matches(/\d/, "must have numbers")
          .matches(
            /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
            "must have special characters"
          ),
      })
    ),
  });

  async function submit(fv: FormValues) {
    try {
      const { nextStep } = await signUp({
        username: fv.email,
        password: fv.password,
        options: {
          userAttributes: {
            given_name: fv.firstName,
            family_name: fv.lastName,
          },
          autoSignIn: false,
        },
      });

      //per cognito config
      if (nextStep.signUpStep !== "CONFIRM_SIGN_UP") throw "";
      if (nextStep.codeDeliveryDetails.deliveryMedium !== "EMAIL") throw "";
      if (!nextStep.codeDeliveryDetails.destination) throw "";

      props.setSignupState({
        type: "confirm",
        codeRecipientEmail: {
          raw: fv.email,
          obscured: nextStep.codeDeliveryDetails.destination,
        },
        userType: fv.userType,
      });
    } catch (err) {
      const message =
        err instanceof AuthError ? err.message : GENERIC_ERROR_MESSAGE;
      handleError(message);
    }
  }

  return (
    <FormProvider {...methods}>
      <FormFields submit={submit} />
    </FormProvider>
  );
}
