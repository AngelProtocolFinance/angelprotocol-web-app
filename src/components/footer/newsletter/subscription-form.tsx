import { Check } from "lucide-react";
import { Form, useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { IEmailSubs } from "types/hubspot-subscription";

export function SubscriptionForm() {
  const fetcher = useFetcher<"success" | "error">();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useRemixForm<IEmailSubs>({
    fetcher,
    submitData: { intent: "subscribe" },
  });

  return (
    <Form
      action="/"
      onSubmit={handleSubmit}
      method="POST"
      className="grid content-start"
    >
      <div className="grid mb-3">
        <input
          {...register("email")}
          className="text-[#000000] opacity-[.9] p-3 rounded-md font-normal text-base md:text-sm border border-gray-l3 w-full outline-blue-d1"
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
        <p className="empty:hidden w-full text-red-d2 text-left mt-0.5 text-xs">
          {errors.email?.message}
        </p>
        {fetcher.data === "success" && <SuccessMessage />}
        {fetcher.data === "error" && (
          <p className="text-xs text-red mt-0.5">Failed to subscribe</p>
        )}
      </div>
      <button
        type="submit"
        name="intent"
        value="subscribe"
        className="sm:justify-self-start rounded-full px-5 py-2 btn-blue text-sm font-medium"
        disabled={isSubmitting}
      >
        Subscribe
      </button>
    </Form>
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
