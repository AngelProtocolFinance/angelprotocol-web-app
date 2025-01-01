import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import googleIcon from "assets/icons/google.svg";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import { Separator } from "components/Separator";
import { Input, PasswordInput } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { Link, useFetcher, useLoaderData, useSearchParams } from "react-router";
import { toast } from "sonner";
import { type ActionData, isActionErr, isValiErr } from "types/action";
import { signUp } from "types/auth";

export default function SignupForm() {
  const fromState = useLoaderData();
  const [params] = useSearchParams();
  const fetcher = useFetcher<ActionData<any>>();

  const [form, fields] = useForm({
    shouldRevalidate: "onInput",
    lastResult: isValiErr(fetcher.data) ? fetcher.data : undefined,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: signUp });
    },
  });

  useEffect(() => {
    if (isActionErr(fetcher.data)) {
      toast.error(fetcher.data.__error);
    }
  }, [fetcher.data]);

  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="grid justify-items-center gap-3.5">
      <div className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl">
        <h3 className="text-center text-2xl font-bold text-navy-d4">
          Philanthropy for Everyone
        </h3>
        <p className="text-center font-normal max-sm:text-sm mt-2">
          Sign up to support 18000+ causes or register and manage your
          nonprofit.
        </p>

        <fetcher.Form
          method="POST"
          action={`.?index&${params.toString()}`}
          className="contents"
        >
          <button
            name="intent"
            value="oauth"
            className="flex-center btn-outline-2 gap-2 h-12 sm:h-[52px] mt-6 border-[0.8px]"
            type="submit"
          >
            <Image src={googleIcon} height={18} width={18} />
            <span className="normal-case font-heading font-semibold text-navy-d4">
              Sign Up with Google
            </span>
          </button>
        </fetcher.Form>

        <Separator classes="my-4 before:mr-3.5 after:ml-3.5 before:bg-navy-l5 after:bg-navy-l5 font-medium text-[13px] text-navy-l3">
          OR
        </Separator>

        <fetcher.Form
          method="POST"
          action={`.?index&${params.toString()}`}
          {...getFormProps(form)}
          className="grid gap-3"
        >
          <div className="flex gap-3">
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
        </fetcher.Form>

        <button
          form={form.id}
          type="submit"
          className="flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full my-8"
        >
          {isSubmitting ? "Submitting..." : "Sign up"}
        </button>

        <span className="flex-center gap-1 max-sm:text-sm font-normal">
          Already have an account?
          <Link
            to={toWithState(appRoutes.signin, fromState)}
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
