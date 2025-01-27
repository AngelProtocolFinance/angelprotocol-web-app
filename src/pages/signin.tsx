import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Link, data, redirect, useLoaderData } from "@remix-run/react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@vercel/remix";
import googleIcon from "assets/icons/google.svg";
import ExtLink from "components/ext-link";
import { Input, PasswordInput, RmxForm, useRmxForm } from "components/form";
import Image from "components/image";
import { Separator } from "components/separator";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import { useActionResult } from "hooks/use-action-result";
import { Mail } from "lucide-react";
import type { ActionData } from "types/action";
import { isError, signIn } from "types/auth";
import { cognito, oauth } from ".server/auth";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { user } = await cognito.retrieve(request);
    if (user) return redirect(appRoutes.marketplace);
    const from = new URL(request.url);

    const fv = await request.formData();
    const redirectTo =
      from.searchParams.get("redirect") || appRoutes.marketplace;
    if (fv.get("intent") === "oauth") {
      const origin = new URL(request.url);
      return redirect(oauth.initiateUrl(redirectTo, origin.origin));
    }

    const payload = parseWithValibot(fv, { schema: signIn });

    if (payload.status !== "success") return payload.reply();

    const res = await cognito.initiate(
      payload.value.email.toLowerCase(),
      payload.value.password,
      request.headers.get("Cookie")
    );

    if (isError(res)) {
      if (res.__type === "UserNotConfirmedException") {
        const to = new URL(from);
        to.pathname = appRoutes.signup + "/confirm";
        to.searchParams.set("email", payload.value.email);
        to.searchParams.set("redirect", redirectTo);
        return redirect(to.toString());
      }

      return payload.reply({ fieldErrors: { password: [res.message] } });
    }

    return redirect(redirectTo, { headers: { "Set-Cookie": res } });
  } catch (err) {
    console.error(err);
    return data<ActionData<any>>({ __error: "Unknown error occured" }, 500);
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const { user } = await cognito.retrieve(request);
  if (user) return redirect(appRoutes.marketplace);
  return new URL(request.url).searchParams.get("redirect") || "/";
};

export const meta: MetaFunction = () =>
  metas({ title: "Login - Better Giving" });

export { ErrorBoundary } from "components/error";
export default function Signin() {
  const { nav, data } = useRmxForm();
  const formErr = useActionResult(data);
  const to = useLoaderData<string>();

  const [form, fields] = useForm({
    shouldRevalidate: "onInput",
    lastResult: formErr,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: signIn });
    },
  });

  const isSubmitting = nav.state !== "idle";

  return (
    <div className="grid justify-items-center gap-3.5 px-4 py-14 text-navy-l1">
      <div className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl">
        <h3 className="text-center text-2xl font-bold text-navy-d4">
          Philanthropy for Everyone
        </h3>
        <p className="text-center font-normal max-sm:text-sm mt-2">
          Log in to support 18000+ causes or register and manage your nonprofit.
        </p>
        <RmxForm disabled={isSubmitting} method="POST" className="contents">
          <button
            name="intent"
            value="oauth"
            type="submit"
            className="flex-center btn-outline-2 gap-2 h-12 sm:h-[52px] mt-6 border-[0.8px]"
          >
            <Image src={googleIcon} height={18} width={18} />
            <span className="normal-case font-heading font-semibold text-navy-d4">
              Continue with Google
            </span>
          </button>
        </RmxForm>
        <Separator classes="my-4 before:mr-3.5 after:ml-3.5 before:bg-navy-l5 after:bg-navy-l5 font-medium text-[13px] text-navy-l3">
          OR
        </Separator>
        <RmxForm
          method="POST"
          disabled={isSubmitting}
          {...getFormProps(form)}
          className="grid gap-3"
        >
          <Input
            {...getInputProps(fields.email, { type: "text" })}
            placeholder="Email address"
            autoComplete="username"
            icon={Mail}
            error={fields.email.errors?.[0]}
          />
          <PasswordInput
            {...getInputProps(fields.password, { type: "text" })}
            error={fields.password.errors?.[0]}
            placeholder="Password"
          />
          <Link
            to={appRoutes.reset_password + `?redirect=${to}`}
            className="font-medium text-navy-l1 hover:text-navy active:text-navy-d2 text-xs sm:text-sm justify-self-end hover:underline"
          >
            Forgot password?
          </Link>
        </RmxForm>
        <button
          disabled={isSubmitting}
          form={form.id}
          type="submit"
          className="flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full mt-4"
        >
          Login
        </button>
        <span className="flex-center gap-1 max-sm:text-sm font-normal mt-8">
          Don't have an account?
          <Link
            to={appRoutes.signup + `?redirect=${to}`}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray font-medium underline"
            aria-disabled={isSubmitting}
          >
            Sign up
          </Link>
        </span>
      </div>
      <span className="text-xs sm:text-sm text-center w-80">
        By signing in, you agree to our{" "}
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
