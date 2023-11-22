import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "aws-amplify/auth";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useErrorContext } from "contexts/ErrorContext";
import { Field } from "components/form";
import { appRoutes } from "constants/routes";
import { FV, schema } from "./schema";

export default function Signup() {
  const { handleError } = useErrorContext();
  const methods = useForm<FV>({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;

  const signup: SubmitHandler<FV> = async (fv) => {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: fv.email,
        password: fv.password,
        options: {
          userAttributes: {
            email: fv.email,
            given_name: fv.firstName,
            family_name: fv.lastName,
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });
      if (!isSignUpComplete && nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        return alert("Redirect to confirm page");
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(signup)}
        className="padded-container py-8 sm:py-16 grid content-start justify-self-center gap-6 w-full max-w-md"
      >
        <Field<FV>
          label="First name"
          name="firstName"
          placeholder="e.g. Alfred"
        />
        <Field<FV> label="Last name" name="lastName" placeholder="e.g. Nobel" />
        <Field<FV>
          label="E-mail address"
          name="email"
          placeholder="e.g. alfrednobel@gmail.com"
        />
        <Field<FV, "password">
          type="password"
          label="Password"
          name="password"
          placeholder="********"
        />
        <Field<FV, "password">
          type="password"
          label="Re-enter password"
          name="passwordConfirmation"
          placeholder="********"
        />
        <button type="submit" className="mt-4 btn-orange font-work">
          Sign up
        </button>

        <p className="text-gray-d1 dark:text-gray text-sm">
          Already a member?{" "}
          <Link className="text-orange" to={appRoutes.signin}>
            Sign in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
