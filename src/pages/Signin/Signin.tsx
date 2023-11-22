import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useErrorContext } from "contexts/ErrorContext";
import LoaderRing from "components/LoaderRing";
import { Field } from "components/form";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import Google from "./Google";
import { FV, schema } from "./schema";

export default function Signin() {
  const { state } = useLocation();

  const { handleError } = useErrorContext();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const currUser = useGetter((state) => state.auth.user);
  const methods = useForm<FV>({ resolver: yupResolver(schema) });

  const directSignin: SubmitHandler<FV> = async ({ email, password }) => {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (!isSignedIn && nextStep.signInStep === "CONFIRM_SIGN_UP") {
        return alert("Redirect to confirm page");
      }
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  if (currUser === "loading" || currUser?.isSigningOut) {
    return (
      <div className="grid content-start place-items-center py-8">
        <LoaderRing thickness={12} classes="w-32 mt-8" />
      </div>
    );
  }

  const _state = state as { from?: Location } | undefined;
  const from = _state?.from?.pathname || "/";
  const search = _state?.from?.search || "";
  if (currUser) {
    return <Navigate to={{ pathname: from, search }} replace />;
  }

  return (
    // <div className="grid content-start justify-items-center py-8">
    <FormProvider {...methods}>
      <fieldset className="contents" disabled={isSubmitting || isRedirecting}>
        <form
          onSubmit={handleSubmit(directSignin)}
          className="grid gap-4 w-full max-w-md py-8 sm:py-16 justify-self-center padded-container"
        >
          <Google setIsRedirecting={setIsRedirecting} from={from} />

          <p className="h-px flex items-center justify-center border-b border-prim my-4">
            <span className="bg-white px-4 text-gray-d1 dark:text-gray text-xs uppercase">
              or
            </span>
          </p>

          <Field<FV>
            label="E-mail address"
            name="email"
            placeholder="e.g. John Doe"
          />
          <Field<FV, "password">
            placeholder="********"
            type="password"
            label="Password"
            name="password"
          />
          <button type="submit" className="mt-3 btn-orange font-work">
            Sign in
          </button>

          <p className="text-gray-d1 dark:text-gray text-sm">
            Don't have an account?{" "}
            <Link className="text-orange" to={appRoutes.signup}>
              Create one
            </Link>
          </p>
        </form>
      </fieldset>
    </FormProvider>
    // </div>
  );
}
