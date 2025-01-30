import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Input } from "components/form";
import { parseWithValibot } from "conform-to-valibot";
import { useActionResult } from "hooks/use-action-result";
import useCounter from "hooks/use-counter";
import { signUpConfirm } from "types/auth";
import type { ActionData } from "./types";

const MAX_TIME = 30;

export { loader, action } from "./api";
export { ErrorBoundary } from "components/error";
export default function ConfirmForm() {
  const email = useLoaderData() as string;
  const fetcher = useFetcher<ActionData>();
  const { counter, resetCounter } = useCounter(MAX_TIME);
  const formErr = useActionResult(fetcher.data, {
    onData: () => resetCounter(),
  });

  const [form, fields] = useForm({
    shouldRevalidate: "onInput",
    lastResult: formErr,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: signUpConfirm });
    },
  });

  return (
    <div className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl">
      <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-d4">
        Verify your account
      </h3>
      <p className="text-center font-normal max-sm:text-sm mt-2">
        You are almost there! 6-digit security code has been sent to{" "}
        <span className="font-medium">{obscureEmail(email)}</span>
      </p>
      <fetcher.Form {...getFormProps(form)} className="contents" method="POST">
        <input readOnly name="email" value={email} className="invisible" />
        <Input
          {...getInputProps(fields.code, { type: "text" })}
          placeholder="Enter 6-digit code"
          classes={{ container: "my-6" }}
          autoComplete="one-time-code"
          error={fields.code.errors?.[0]}
        />
      </fetcher.Form>

      <fetcher.Form
        className="flex items-center justify-between text-xs sm:text-sm font-medium"
        method="POST"
      >
        <input readOnly name="email" value={email} className="hidden" />
        <span>
          Trouble getting your code? Request a new one in: 00:
          {String(counter).padStart(2, "0")}
        </span>
        <button
          type="submit"
          name="intent"
          value="resend-otp"
          className="text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray-l2 font-bold underline"
          disabled={counter > 0 || fetcher.state === "submitting"}
        >
          Resend code
        </button>
      </fetcher.Form>

      <button
        disabled={fetcher.state === "submitting"}
        form={form.id}
        type="submit"
        className="flex-center btn-blue h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold w-full mt-5"
      >
        Verify account
      </button>
    </div>
  );
}

function obscureEmail(email: string) {
  // Validate email
  if (!email || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  // Split email into parts
  const [username, domain] = email.split("@");

  // Obscure username
  const obscuredUsername =
    username.length > 3
      ? username.slice(0, 2) + "*".repeat(username.length - 2)
      : username.slice(0, 1) + "*".repeat(username.length - 1);

  // Obscure domain
  const domainParts = domain.split(".");
  const obscuredDomain = domainParts
    .map((part, index) => {
      // Keep TLD visible
      if (index === domainParts.length - 1) {
        return part;
      }
      // Obscure domain name
      return part.length > 3
        ? part.slice(0, 2) + "*".repeat(part.length - 2)
        : part.slice(0, 1) + "*".repeat(part.length - 1);
    })
    .join(".");

  return `${obscuredUsername}@${obscuredDomain}`;
}
