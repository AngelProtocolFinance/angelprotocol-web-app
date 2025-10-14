import { valibotResolver } from "@hookform/resolvers/valibot";
import googleIcon from "assets/icons/google.svg";
import { ExtLink } from "components/ext-link";
import { Input, PasswordInput, RmxForm } from "components/form";
import { Image } from "components/image";
import { Separator } from "components/separator";
import { search } from "helpers/https";
import { metas } from "helpers/seo";
import { Mail } from "lucide-react";
import { Link, data, href, redirect, useNavigation } from "react-router";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import type { ActionData, IFormInvalid } from "types/action";
import { type ISignIn, is_error, sign_in } from "types/auth";
import type { Route } from "./+types/signin";
import { cognito, oauth } from ".server/auth";

export const action = async ({ request }: Route.ActionArgs) => {
  try {
    const from = new URL(request.url);
    const redirect_to =
      from.searchParams.get("redirect") || href("/marketplace");
    const { user } = await cognito.retrieve(request);
    if (user) return redirect(redirect_to);

    const fv = await request.formData();

    if (fv.get("intent") === "oauth") {
      return redirect(oauth.initiate_url(redirect_to, from.origin));
    }

    const payload = await getValidatedFormData<ISignIn>(
      fv,
      valibotResolver(sign_in)
    );
    if (payload.errors) return payload;

    const res = await cognito.initiate(
      payload.data.email.toLowerCase(),
      payload.data.password,
      request.headers.get("cookie")
    );

    if (is_error(res)) {
      if (res.__type === "UserNotConfirmedException") {
        const to = new URL(from);
        to.pathname = href("/signup/confirm");
        to.searchParams.set("email", payload.data.email);
        to.searchParams.set("redirect", redirect_to);
        return redirect(to.toString());
      }

      return {
        errors: { password: { type: "value", message: res.message } },
        receivedValues: payload.receivedValues,
      } satisfies IFormInvalid<ISignIn>;
    }

    return redirect(redirect_to, { headers: { "set-cookie": res } });
  } catch (err) {
    console.error(err);
    return data<ActionData<any>>({ __error: "Unknown error occured" }, 500);
  }
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user } = await cognito.retrieve(request);
  const { redirect: to } = search(request);
  if (user) return redirect(to || href("/marketplace"));
  return to || "/";
};

export const meta: Route.MetaFunction = () =>
  metas({ title: "Login - Better Giving" });

export { ErrorBoundary } from "components/error";
export default function Page({ loaderData: to }: Route.ComponentProps) {
  const nav = useNavigation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useRemixForm<ISignIn>({
    resolver: valibotResolver(sign_in),
  });

  const form_id = "signin-form";
  const is_submitting = nav.state !== "idle";

  return (
    <div className="grid justify-items-center gap-3.5 px-4 py-14 text-gray">
      <div className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl">
        <h3 className="text-center text-2xl font-semibold text-gray-d4">
          Philanthropy for Everyone
        </h3>
        <p className="text-center font-normal max-sm:text-sm mt-2">
          Log in to support 18000+ causes or register and manage your nonprofit.
        </p>
        <RmxForm disabled={is_submitting} method="POST" className="contents">
          <button
            name="intent"
            value="oauth"
            type="submit"
            className="flex-center btn-outline btn rounded-lg gap-2 h-12 sm:h-[52px] mt-6"
          >
            <Image src={googleIcon} height={18} width={18} />
            <span className="normal-case   font-medium text-gray-d4">
              Continue with Google
            </span>
          </button>
        </RmxForm>
        <Separator classes="my-4 before:mr-3.5 after:ml-3.5 before:bg-gray-l2 after:bg-gray-l2  text-[13px] text-gray">
          OR
        </Separator>
        <RmxForm
          id={form_id}
          onSubmit={handleSubmit}
          method="POST"
          disabled={is_submitting}
          className="grid gap-3"
        >
          <Input
            {...register("email")}
            placeholder="Email address"
            autoComplete="username"
            icon={Mail}
            error={errors.email?.message}
          />
          <PasswordInput
            {...register("password")}
            error={errors.password?.message}
            placeholder="Password"
          />
          <Link
            to={`${href("/login/reset")}?redirect=${to}`}
            className=" text-gray hover:text-gray-d1 active:text-gray-d2 text-xs sm:text-sm justify-self-end hover:underline"
          >
            Forgot password?
          </Link>
        </RmxForm>
        <button
          disabled={is_submitting}
          form={form_id}
          type="submit"
          className="flex-center btn-blue h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-semibold w-full mt-4"
        >
          Login
        </button>
        <span className="flex-center gap-1 max-sm:text-sm font-normal mt-8">
          Don't have an account?
          <Link
            to={`${href("/signup")}?redirect=${to}`}
            className="text-blue-d1 hover:text-blue active:text-blue-d2 aria-disabled:text-gray  underline"
            aria-disabled={is_submitting}
          >
            Sign up
          </Link>
        </span>
      </div>
      <span className="text-xs sm:text-sm text-center w-80">
        By signing in, you agree to our{" "}
        <ExtLink
          href={href("/privacy-policy")}
          className="text-blue hover:text-blue-l2"
        >
          Privacy Policy
        </ExtLink>
        ,{" "}
        <ExtLink
          href={href("/terms-of-use")}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use (Donors)
        </ExtLink>
        , and{" "}
        <ExtLink
          href={href("/terms-of-use-npo")}
          className="text-blue hover:text-blue-l2"
        >
          Terms of Use (Nonprofits)
        </ExtLink>
      </span>
    </div>
  );
}
