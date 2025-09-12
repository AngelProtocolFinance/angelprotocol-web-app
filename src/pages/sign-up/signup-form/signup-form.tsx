import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import googleIcon from "assets/icons/google.svg";
import ExtLink from "components/ext-link";
import { Input, PasswordInput, RmxForm, useRmxForm } from "components/form";
import Image from "components/image";
import { Separator } from "components/separator";
import { parseWithValibot } from "conform-to-valibot";
import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import { useActionResult } from "hooks/use-action-result";
import { Mail } from "lucide-react";
import { Link, type MetaDescriptor } from "react-router";
import type { ActionData } from "types/action";
import { signUp } from "types/auth";
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
      { to: appRoutes.terms_nonprofits, title: "Terms of Use (Nonprofits)" },
    ],
  },

  referrals: {
    title: "Empower More Nonprofits",
    description: `Sign up to refer organizations to ${APP_NAME} and help them grow their impact make a difference with every connection.`,
    terms: [
      { to: appRoutes.terms_referrals, title: "Terms of Use (Referrals)" },
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
      { to: appRoutes.terms_donors, title: "Terms of Use (Donors)" },
      { to: appRoutes.terms_nonprofits, title: "Terms of Use (Nonprofits)" },
    ],
  },
};

const get_context = (to: string): Context => {
  if (to.startsWith(appRoutes.register)) return context.registration;
  if (to.startsWith(`${appRoutes.user_dashboard}/referrals`))
    return context.referrals;
  return context.fallback;
};

export const meta: Route.MetaFunction = ({ loaderData: to }) => {
  const ctx = get_context(to as string);
  return ctx?.meta || [{ title: "Sign Up - Better Giving" }];
};

export default function SignupForm({ loaderData: to }: Route.ComponentProps) {
  const ctx = get_context(to);
  const terms_0 = ctx.terms[0];
  const terms_1 = ctx.terms[1];

  const { data, nav } = useRmxForm<ActionData>();
  const formErr = useActionResult(data);

  const [form, fields] = useForm({
    shouldRevalidate: "onInput",
    lastResult: formErr,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: signUp });
    },
  });

  const isSubmitting = nav.state !== "idle";

  return (
    <div className="grid justify-items-center gap-3.5">
      <div className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl">
        <h3 className="text-center text-2xl font-bold text-gray-d4">
          {ctx.title}
        </h3>
        <p className="text-center font-normal max-sm:text-sm mt-2">
          {ctx.description}
        </p>

        <RmxForm disabled={isSubmitting} method="POST" className="contents">
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
          method="POST"
          {...getFormProps(form)}
          disabled={isSubmitting}
          className="grid gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <Input
              {...getInputProps(fields.firstName, { type: "text" })}
              placeholder="First Name"
              error={fields.firstName.errors?.[0]}
            />
            <Input
              {...getInputProps(fields.lastName, { type: "text" })}
              placeholder="Last Name"
              error={fields.firstName.errors?.[0]}
            />
          </div>
          <Input
            {...getInputProps(fields.email, { type: "email" })}
            autoComplete="username"
            placeholder="Email address"
            icon={Mail}
            error={fields.email.errors?.[0]}
            classes={{ container: "mt-4" }}
          />
          <Input
            {...getInputProps(fields.emailConfirmation, { type: "email" })}
            autoComplete="username"
            placeholder="Confirm email"
            icon={Mail}
            error={fields.emailConfirmation.errors?.[0]}
            classes={{ container: "mb-4" }}
          />
          <PasswordInput
            {...getInputProps(fields.password, { type: "password" })}
            placeholder="Create password"
            error={fields.password.errors?.[0]}
          />
        </RmxForm>

        <button
          disabled={isSubmitting}
          form={form.id}
          type="submit"
          className="flex-center btn-blue h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full my-8"
        >
          {isSubmitting ? "Submitting..." : "Sign up"}
        </button>

        <span className="flex-center gap-1 max-sm:text-sm font-normal">
          Already have an account?
          <Link
            to={appRoutes.signin + `?redirect=${to}`}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray font-medium underline"
            aria-disabled={isSubmitting}
          >
            Login
          </Link>
        </span>
      </div>

      <span className="text-xs sm:text-sm text-center w-80">
        By signing up, you agree to our{" "}
        <ExtLink
          href={appRoutes.privacy_policy}
          className="text-blue hover:text-blue-l2"
        >
          Privacy Policy
        </ExtLink>
        , {!terms_1 && ` and  `}
        {terms_0 && (
          <ExtLink
            href={appRoutes.terms_donors}
            className="text-blue hover:text-blue-l2"
          >
            {terms_0.title}
          </ExtLink>
        )}
        {terms_0 && terms_1 && `, and  `}
        {terms_1 && (
          <ExtLink href={terms_1.to} className="text-blue hover:text-blue-l2">
            {terms_1.title}
          </ExtLink>
        )}
      </span>
    </div>
  );
}
