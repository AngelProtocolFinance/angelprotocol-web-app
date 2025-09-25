import googleIcon from "assets/icons/google.svg";
import { ExtLink } from "components/ext-link";
import { Input, PasswordInput, RmxForm } from "components/form";
import { Image } from "components/image";
import { Separator } from "components/separator";
import { APP_NAME } from "constants/env";
import { app_routes } from "constants/routes";
import { metas } from "helpers/seo";
import { Mail } from "lucide-react";
import { Link, type MetaDescriptor, useNavigation } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { ISignUp } from "types/auth";
import type { Route } from "./+types/signup-form";

export { action } from "./api";
export { loader } from "../loader";
export { ErrorBoundary } from "components/error";

interface Terms {
  to: string;
  title: string;
}

interface Context {
  title: string;
  description: string;
  terms: Terms[];
  meta?: MetaDescriptor[];
}

const context: { [id: string]: Context } = {
  registration: {
    title: "Philanthropy for Everyone",
    description: "Sign up to register and manage your nonprofit.",
    terms: [
      { to: app_routes.terms_nonprofits, title: "Terms of Use (Nonprofits)" },
    ],
  },

  referrals: {
    title: "Empower More Nonprofits",
    description: `Sign up to refer organizations to ${APP_NAME} and help them grow their impact make a difference with every connection.`,
    terms: [
      { to: app_routes.terms_referrals, title: "Terms of Use (Referrals)" },
    ],
    meta: metas({
      title: "Sign Up Referral | Better Giving",
      description:
        "Join Better Giving and start sharing the good! Sign up now to get your own referral code and link, earn rewards by inviting others to give better",
    }),
  },
  fallback: {
    title: "Philanthropy for Everyone",
    description:
      "Sign up to support 18000+ causes or register and manage your nonprofit.",
    terms: [
      { to: app_routes.terms_donors, title: "Terms of Use (Donors)" },
      { to: app_routes.terms_nonprofits, title: "Terms of Use (Nonprofits)" },
    ],
  },
};

const get_context = (to: string): Context => {
  if (to.startsWith(app_routes.register)) return context.registration;
  if (to.startsWith(`${app_routes.user_dashboard}/referrals`))
    return context.referrals;
  return context.fallback;
};

export const meta: Route.MetaFunction = ({ loaderData: to }) => {
  const ctx = get_context(to as string);
  return ctx?.meta || [{ title: "Sign Up - Better Giving" }];
};

export default function Page({ loaderData: to }: Route.ComponentProps) {
  const ctx = get_context(to);
  const terms_0 = ctx.terms[0];
  const terms_1 = ctx.terms[1];

  const nav = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<ISignUp>({});

  const form_id = "sign-up-form";
  const is_submitting = nav.state !== "idle";

  return (
    <div className="grid justify-items-center gap-3.5">
      <div className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl">
        <h3 className="text-center text-2xl font-bold text-gray-d4">
          {ctx.title}
        </h3>
        <p className="text-center font-normal max-sm:text-sm mt-2">
          {ctx.description}
        </p>

        <RmxForm disabled={is_submitting} method="POST" className="contents">
          <button
            name="intent"
            value="oauth"
            className="flex-center btn-outline rounded-lg gap-2 h-12 sm:h-[52px] mt-6 border-[0.8px]"
            type="submit"
          >
            <Image src={googleIcon} height={18} width={18} />
            <span className="normal-case font-heading font-semibold text-gray-d4">
              Sign Up with Google
            </span>
          </button>
        </RmxForm>

        <Separator classes="my-4 before:mr-3.5 after:ml-3.5 before:bg-gray-l2 after:bg-gray-l2 font-medium text-[13px] text-gray">
          OR
        </Separator>

        <RmxForm
          id={form_id}
          method="POST"
          onSubmit={handleSubmit}
          disabled={is_submitting}
          className="grid gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <Input
              {...register("first_name")}
              placeholder="First Name"
              error={errors.first_name?.message}
            />
            <Input
              {...register("last_name")}
              placeholder="Last Name"
              error={errors.last_name?.message}
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
            {...register("email_confirmation")}
            autoComplete="username"
            placeholder="Confirm email"
            icon={Mail}
            error={errors.email_confirmation?.message}
            classes={{ container: "mb-4" }}
          />
          <PasswordInput
            {...register("password")}
            placeholder="Create password"
            error={errors.password?.message}
          />
        </RmxForm>

        <button
          disabled={is_submitting}
          form={form_id}
          type="submit"
          className="flex-center btn-blue h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full my-8"
        >
          {is_submitting ? "Submitting..." : "Sign up"}
        </button>

        <span className="flex-center gap-1 max-sm:text-sm font-normal">
          Already have an account?
          <Link
            to={`${app_routes.signin}?redirect=${to}`}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray font-medium underline"
            aria-disabled={is_submitting}
          >
            Login
          </Link>
        </span>
      </div>

      <span className="text-xs sm:text-sm text-center w-80">
        By signing up, you agree to our{" "}
        <ExtLink
          href={app_routes.privacy_policy}
          className="text-blue hover:text-blue-l2"
        >
          Privacy Policy
        </ExtLink>
        , {!terms_1 && " and  "}
        {terms_0 && (
          <ExtLink
            href={app_routes.terms_donors}
            className="text-blue hover:text-blue-l2"
          >
            {terms_0.title}
          </ExtLink>
        )}
        {terms_0 && terms_1 && ", and  "}
        {terms_1 && (
          <ExtLink href={terms_1.to} className="text-blue hover:text-blue-l2">
            {terms_1.title}
          </ExtLink>
        )}
      </span>
    </div>
  );
}
