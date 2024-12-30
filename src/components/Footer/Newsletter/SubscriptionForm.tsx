import {
  type SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { parseWithValibot } from "conform-to-valibot";
import { Check } from "lucide-react";
import { useFetcher } from "react-router";
import { emailSubs } from "types/hubspot-subscription";

export default function SubscriptionForm() {
  const fetcher = useFetcher<SubmissionResult | "success" | "error">();

  const [form, fields] = useForm({
    shouldRevalidate: "onInput",
    // Optional: Required only if you're validating on the server
    lastResult: typeof fetcher.data === "string" ? undefined : fetcher.data,
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema: emailSubs });
    },
  });

  return (
    <fetcher.Form
      {...getFormProps(form)}
      action="/"
      method="POST"
      className="grid content-start"
      onSubmit={form.onSubmit}
    >
      <div className="grid mb-3">
        <input
          {...getInputProps(fields.email, { type: "email" })}
          className="text-[#000000] opacity-[.9] p-3 rounded-md font-normal text-base md:text-sm border border-gray-l4 w-full outline-blue-d1"
          placeholder="Enter your email"
          disabled={fetcher.state === "submitting"}
        />
        <p className="empty:hidden w-full text-red-d2 text-left mt-0.5 text-xs">
          {fields.email.errors?.[0]}
        </p>
        {fetcher.data === "success" ? (
          <SuccessMessage />
        ) : fetcher.data === "error" ? (
          <p className="text-xs text-red mt-0.5">Failed to subscribe</p>
        ) : null}
      </div>
      <button
        type="submit"
        name="intent"
        value="subscribe"
        className="sm:justify-self-start bg-blue-d1 disabled:bg-gray rounded-full px-5 py-2 text-white text-sm font-medium"
        disabled={fetcher.state === "submitting"}
      >
        Subscribe
      </button>
    </fetcher.Form>
  );
}

function SuccessMessage() {
  return (
    <span className="flex gap-1 w-full text-xs">
      <Check size={14} />
      <p>
        The form was sent successfully. By doing so, you have agreed to our
        privacy policy
      </p>
    </span>
  );
}
