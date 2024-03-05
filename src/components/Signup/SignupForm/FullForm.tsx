import googleIcon from "assets/icons/google.svg";
import { signInWithRedirect } from "aws-amplify/auth";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { Form } from "components/form";
import { Separator } from "components/registration";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { appRoutes } from "constants/routes";
import { determineAuthRedirectPath } from "helpers";
import { useFormContext } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { FormValues } from "../types";
import Field from "./Field";
import PasswordField from "./PasswordField";
import UserTypeSelector from "./UserTypeSelector";

type Props = {
  className?: string;
  submit: (fv: FormValues) => Promise<void>;
};

export default function FullForm({ className = "", submit }: Props) {
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
    <Form
      className={`${className} grid text-[#1D3C51]`}
      disabled={isSubmitting}
      onSubmit={handleSubmit(submit)}
    >
      <h3 className="text-center text-2xl font-bold text-navy-d4">
        Philanthropy for Everyone
      </h3>
      <h4 className="text-center font-body font-normal mt-2">
        Sign up to support from 18000+ causes
      </h4>

      <button
        className="flex-center btn-outline-2 gap-2 h-[52px] mt-6"
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
          <Field name="firstName" placeholder="First Name" />
          <Field name="lastName" placeholder="Last Name" />
        </div>
        <Field name="email" placeholder="Email address" icon="Email" />
        <PasswordField />
      </div>

      <span className="mt-7 mb-3 font-normal">You are signing up as</span>
      <UserTypeSelector />

      <button
        type="submit"
        className="btn-blue bg-blue-d1 rounded-full normal-case px-4 w-full my-8"
      >
        {isSubmitting ? "Submitting..." : "Sign up"}
      </button>

      <span className="flex justify-center items-center gap-1 text-base font-normal">
        Already have an account?
        <Link
          to={appRoutes.signin}
          state={state}
          className="text-blue-d1 hover:text-blue active:text-blue-d2 focus:outline-blue-d1 font-medium underline"
        >
          Sign in
        </Link>
      </span>
    </Form>
  );
}
