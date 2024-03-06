import googleIcon from "assets/icons/google.svg";
import { signInWithRedirect } from "aws-amplify/auth";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { Form, Input } from "components/form";
import { Separator } from "components/registration";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { appRoutes } from "constants/routes";
import { determineAuthRedirectPath } from "helpers";
import { useFormContext } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { FormValues } from "../types";
import PasswordField from "./PasswordField";
import UserTypeSelector from "./UserTypeSelector";

type Props = {
  submit: (fv: FormValues) => Promise<void>;
};

export default function FormFields({ submit }: Props) {
  const { state } = useLocation();
  const redirectPath = determineAuthRedirectPath(state);
  const currUser = useGetter((state) => state.auth.user);

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useFormContext<FormValues>();

  if (currUser === "loading" || currUser?.isSigningOut) {
    return (
      <div className="grid content-start place-items-center py-14">
        <LoaderRing thickness={12} classes="w-32 mt-8" />
      </div>
    );
  }

  if (currUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="grid justify-items-center gap-3.5">
      <Form
        className="grid w-full max-w-md px-7 py-8 bg-white border border-gray-l4 rounded-2xl"
        disabled={isSubmitting}
        onSubmit={handleSubmit(submit)}
      >
        <h3 className="text-center text-2xl font-bold text-navy-d4">
          Philanthropy for Everyone
        </h3>
        <p className="text-center font-body font-normal mt-2">
          Sign up to support from 18000+ causes
        </p>
        <button
          className="flex-center btn-outline-2 gap-2 h-[52px] mt-6 border-[0.8px]"
          type="button"
          onClick={() => {
            localStorage.setItem(OAUTH_PATH_STORAGE_KEY, redirectPath.pathname);
            signInWithRedirect({ provider: "Google" });
          }}
        >
          <Image src={googleIcon} height={18} width={18} />
          <span className="normal-case font-heading font-semibold">
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
          <PasswordField />
        </div>
        <span className="mt-7 mb-3 font-normal">You are signing up as</span>
        <UserTypeSelector />
        <button
          type="submit"
          className="flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-[52px] rounded-full normal-case text-lg font-bold w-full my-8"
        >
          {isSubmitting ? "Submitting..." : "Sign up"}
        </button>
        <span className="flex-center gap-1 text-base font-normal">
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
      <span className="text-sm text-center w-72">
        By signing up, you agree to our Terms, Data Policy and Cookies Policy.
      </span>
    </div>
  );
}
