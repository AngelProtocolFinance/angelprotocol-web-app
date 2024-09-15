import { yupResolver } from "@hookform/resolvers/yup";
import googleIcon from "assets/icons/google.svg";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import LoaderRing from "components/LoaderRing";
import { Separator } from "components/Separator";
import { Form, Input, PasswordInput } from "components/form";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { getAuthRedirect, logger } from "helpers";
import { cognito, isError } from "helpers/cognito";
import { useController, useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { password, requiredString } from "schemas/string";
import { useSaveSignupMutation } from "services/aws/hubspot";
import { useGetter } from "store/accessors";
import type { OAuthState, SignInRouteState } from "types/auth";
import { mixed, object, ref } from "yup";
import type { FormValues, StateSetter, UserType } from "../types";
import UserTypeSelector from "./UserTypeSelector";
import { Mail } from "lucide-react";

type Props = {
  setSignupState: StateSetter;
  classes?: string;
};

export default function SignupForm(props: Props) {
  const [savetoHubspot] = useSaveSignupMutation();
  const location = useLocation();
  const fromState: SignInRouteState | undefined = location.state;
  const isRegistrant = fromState?.from === appRoutes.register;

  const { handleError, displayError } = useErrorContext();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    trigger,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      userType: isRegistrant ? "nonprofit" : undefined,
    },
    resolver: yupResolver(
      object({
        email: requiredString.trim().strict().email("invalid email format"),
        emailConfirmation: requiredString
          .trim()
          .strict()
          .email("invalid email format")
          .oneOf([ref("email")], "email mismatch"),
        firstName: requiredString.trim(),
        lastName: requiredString.trim(),
        userType: mixed<UserType>()
          .required("Please select an option to proceed")
          .oneOf(["donor", "nonprofit"]),
        password: password,
      })
    ),
  });
  const { field: userType } = useController({ name: "userType", control });

  const currUser = useGetter((state) => state.auth.user);

  if (currUser === "loading" || currUser?.isSigningOut) {
    return <LoaderRing thickness={12} classes="w-32 mt-8" />;
  }

  const redirect = getAuthRedirect(fromState, {
    isNpo: userType.value === "nonprofit",
  });
  if (currUser) {
    return <Navigate to={redirect.path} replace />;
  }

  async function submit(fv: FormValues) {
    try {
      try {
        await savetoHubspot({
          email: fv.email,
          firstName: fv.firstName,
          lastName: fv.lastName,
          type: fv.userType,
        }).unwrap();
      } catch (err) {
        logger.error(err);
      }

      const res = await cognito.signup(fv.email.toLowerCase(), fv.password, {
        firstName: fv.firstName,
        lastName: fv.lastName,
      });

      if (isError(res)) return displayError(res.message);

      props.setSignupState({
        type: "confirm",
        codeRecipientEmail: {
          raw: fv.email.toLowerCase(),
          obscured: res,
        },
        userType: fv.userType,
      });
    } catch (err) {
      handleError(err, { context: "signing up" });
    }
  }

  return (
    <div className="grid justify-items-center gap-3.5">
      <Form
        className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl"
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

        {!isRegistrant && (
          <UserTypeSelector
            classes="mt-5"
            value={userType.value}
            onChange={userType.onChange}
            error={errors.userType?.message}
          />
        )}

        <button
          className="flex-center btn-outline-2 gap-2 h-12 sm:h-[52px] mt-6 border-[0.8px]"
          type="button"
          onClick={async () => {
            const valid = await trigger("userType");
            if (!valid) return;

            const stored: OAuthState = {
              pathname: redirect.path,
              data: redirect.data,
            };
            await signInWithRedirect({
              provider: "Google",
              customState: JSON.stringify(stored),
            });
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
            <Input
              {...register("firstName")}
              placeholder="First Name"
              error={errors.firstName?.message}
            />
            <Input
              {...register("lastName")}
              placeholder="Last Name"
              error={errors.lastName?.message}
            />
          </div>
          <Input
            {...register("email")}
            autoComplete="username"
            placeholder="Email address"
            icon={Mail}
            error={errors.email?.message}
            classes={{ container: "mt-4" }}
          />
          <Input
            {...register("emailConfirmation")}
            autoComplete="username"
            placeholder="Confirm email"
            icon={Mail}
            error={errors.emailConfirmation?.message}
            classes={{ container: "mb-4" }}
          />
          <PasswordInput
            {...register("password")}
            placeholder="Create password"
            error={errors.password?.message}
          />
        </div>

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
            state={fromState}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray font-medium underline"
            aria-disabled={isSubmitting}
          >
            Login
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
