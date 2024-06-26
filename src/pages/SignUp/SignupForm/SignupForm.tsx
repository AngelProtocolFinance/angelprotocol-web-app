import { yupResolver } from "@hookform/resolvers/yup";
import googleIcon from "assets/icons/google.svg";
import { AuthError, signInWithRedirect, signUp } from "aws-amplify/auth";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { Separator } from "components/Separator";
import { Form, Input, PasswordInput } from "components/form";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { determineAuthRedirectPath } from "helpers";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { password, requiredString } from "schemas/string";
import { useGetter } from "store/accessors";
import type { StoredRouteState } from "types/auth";
import { mixed, object } from "yup";
import type { FormValues, StateSetter, UserType } from "../types";
import UserTypeSelector from "./UserTypeSelector";

type Props = {
  setSignupState: StateSetter;
  classes?: string;
};

export default function SignupForm(props: Props) {
  const { handleError, displayError } = useErrorContext();
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      object({
        email: requiredString.trim().email("invalid email format"),
        firstName: requiredString.trim(),
        lastName: requiredString.trim(),
        userType: mixed<UserType>()
          .required("required")
          .oneOf(["donor", "non-profit"]),
        password: password,
      })
    ),
  });

  const { state } = useLocation();
  const { redirectPath, data } = determineAuthRedirectPath(state);
  const currUser = useGetter((state) => state.auth.user);

  if (currUser === "loading" || currUser?.isSigningOut) {
    return <LoaderRing thickness={12} classes="w-32 mt-8" />;
  }

  if (currUser) {
    return <Navigate to={redirectPath} replace />;
  }

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
      if (nextStep.signUpStep !== "CONFIRM_SIGN_UP")
        throw `Unexpected next step: ${nextStep.signUpStep}`;
      if (nextStep.codeDeliveryDetails.deliveryMedium !== "EMAIL")
        throw `Unexpected code delivery medium: ${nextStep.codeDeliveryDetails.deliveryMedium}`;
      if (!nextStep.codeDeliveryDetails.destination)
        throw `Missing code delivery destination`;

      props.setSignupState({
        type: "confirm",
        codeRecipientEmail: {
          raw: fv.email,
          obscured: nextStep.codeDeliveryDetails.destination,
        },
        userType: fv.userType,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        return displayError(err.message);
      }

      handleError(err, { context: "signing up" });
    }
  }

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  return (
    <div className="grid justify-items-center gap-3.5">
      <Form
        className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl"
        methods={methods}
        disabled={isSubmitting}
        onSubmit={handleSubmit(submit)}
      >
        <h3 className="text-center text-2xl font-bold text-navy-d4">
          Philanthropy for Everyone
        </h3>
        <p className="text-center font-normal max-sm:text-sm mt-2">
          Sign up to support 18000+ causes or register and manage your
          nonprofit.
        </p>

        <button
          className="flex-center btn-outline-2 gap-2 h-12 sm:h-[52px] mt-6 border-[0.8px]"
          type="button"
          onClick={() => {
            const stored: StoredRouteState = {
              pathname: redirectPath.pathname,
              data,
            };
            localStorage.setItem(
              OAUTH_PATH_STORAGE_KEY,
              JSON.stringify(stored)
            );
            signInWithRedirect({ provider: "Google" });
          }}
        >
          <Image src={googleIcon} height={18} width={18} />
          <span className="normal-case font-heading font-semibold text-navy-d4">
            Sign Up with Google
          </span>
        </button>

        <Separator classes="my-4 before:mr-3.5 after:ml-3.5 before:bg-navy-l5 after:bg-navy-l5 font-medium text-[13px] text-navy-l3">
          OR
        </Separator>

        <div className="grid gap-3">
          <div className="flex gap-3">
            <Input<FormValues> name="firstName" placeholder="First Name" />
            <Input<FormValues> name="lastName" placeholder="Last Name" />
          </div>
          <Input<FormValues>
            name="email"
            placeholder="Email address"
            icon="Email"
          />
          <PasswordInput<FormValues>
            name="password"
            placeholder="Create password"
          />
        </div>

        <span className="mt-7 mb-3 font-normal max-sm:text-sm">
          You are signing up as
        </span>
        <UserTypeSelector />

        <button
          type="submit"
          className="flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full my-8"
        >
          {isSubmitting ? "Submitting..." : "Sign up"}
        </button>

        <span className="flex-center gap-1 max-sm:text-sm font-normal">
          Already have an account?
          <Link
            to={appRoutes.signin}
            state={state}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray font-medium underline"
            aria-disabled={isSubmitting}
          >
            Sign in
          </Link>
        </span>
      </Form>

      <span className="text-xs sm:text-sm text-center w-80">
        By signing up, you agree to our{" "}
        <ExtLink
          href={appRoutes.privacy_policy}
          className="text-blue hover:text-blue-l2"
        >
          Privacy Policy
        </ExtLink>
        ,{" "}
        <ExtLink
          href={appRoutes.terms_donors}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use (Donors)
        </ExtLink>
        , and{" "}
        <ExtLink
          href={appRoutes.terms_nonprofits}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use (Nonprofits)
        </ExtLink>
      </span>
    </div>
  );
}
