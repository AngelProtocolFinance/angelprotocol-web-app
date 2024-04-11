import { yupResolver } from "@hookform/resolvers/yup";
import googleIcon from "assets/icons/google.svg";
import { AuthError, signIn, signInWithRedirect } from "aws-amplify/auth";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { Separator } from "components/Separator";
import { Form, Input, PasswordInput } from "components/form";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { PRIVACY_POLICY, TERMS_OF_USE_NPO } from "constants/urls";
import { useErrorContext } from "contexts/ErrorContext";
import { determineAuthRedirectPath } from "helpers";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { password, requiredString } from "schemas/string";
import { useGetter } from "store/accessors";
import { StoredRouteState } from "types/auth";
import { object } from "yup";

type FormValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const { handleError, displayError } = useErrorContext();
  const methods = useForm<FormValues>({
    resolver: yupResolver(
      object({
        email: requiredString.trim().email("invalid email format"),
        password: password,
      })
    ),
  });

  const { state } = useLocation();
  const { redirectPath, data } = determineAuthRedirectPath(state, {
    isSigningUp: false,
  });
  const currUser = useGetter((state) => state.auth.user);

  if (currUser === "loading" || currUser?.isSigningOut) {
    return (
      <div className="grid content-start place-items-center py-14">
        <LoaderRing thickness={12} classes="w-32 mt-8" />
      </div>
    );
  }

  if (currUser) {
    return <Navigate to={redirectPath} state={data} replace />;
  }

  async function submit(fv: FormValues) {
    try {
      const { nextStep } = await signIn({
        username: fv.email,
        password: fv.password,
      });

      if (nextStep.signInStep !== "DONE")
        throw `Unexpected next step: ${nextStep.signInStep}`;
    } catch (err) {
      if (err instanceof AuthError) {
        return displayError(err.message);
      }
      handleError(err, { context: "signing in" });
    }
  }

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  return (
    <div className="grid justify-items-center gap-3.5 px-4 py-14 text-navy-l1">
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
          Log in to support 18000+ causes or register and manage your nonprofit.
        </p>
        <button
          className="flex-center btn-outline-2 gap-2 h-12 sm:h-[52px] mt-6 border-[0.8px]"
          type="button"
          onClick={() => {
            const routeState: StoredRouteState = {
              pathname: redirectPath.pathname,
              data,
            };
            localStorage.setItem(
              OAUTH_PATH_STORAGE_KEY,
              JSON.stringify(routeState)
            );
            signInWithRedirect({ provider: "Google" });
          }}
        >
          <Image src={googleIcon} height={18} width={18} />
          <span className="normal-case font-heading font-semibold text-navy-d4">
            Continue with Google
          </span>
        </button>
        <Separator classes="my-4 before:mr-3.5 after:ml-3.5 before:bg-navy-l5 after:bg-navy-l5 font-medium text-[13px] text-navy-l3">
          OR
        </Separator>
        <div className="grid gap-3">
          <Input<FormValues>
            name="email"
            placeholder="Email address"
            icon="Email"
          />
          <PasswordInput<FormValues> name="password" placeholder="Password" />
          <Link
            to={appRoutes.reset_password}
            className="font-medium text-navy-l1 hover:text-navy active:text-navy-d2 text-xs sm:text-sm justify-self-end hover:underline"
            state={state}
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full mt-4"
        >
          {isSubmitting ? "Submitting..." : "Log in"}
        </button>
        <span className="flex-center gap-1 max-sm:text-sm font-normal mt-8">
          Don't have an account?
          <Link
            to={appRoutes.signup}
            state={state}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray font-medium underline"
            aria-disabled={isSubmitting}
          >
            Sign up
          </Link>
        </span>
      </Form>
      <span className="text-xs sm:text-sm text-center w-80">
        By signing in, you agree to our{" "}
        <ExtLink href={PRIVACY_POLICY} className="text-blue hover:text-blue-l2">
          Privacy Policy
        </ExtLink>
        ,{" "}
        <ExtLink
          href={`${BASE_URL}/cookie-policy/`}
          className="text-blue hover:text-blue-l2"
        >
          Cookie Policy
        </ExtLink>
        , and{" "}
        <ExtLink
          href={TERMS_OF_USE_NPO}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use
        </ExtLink>
      </span>
    </div>
  );
}
