import { valibotResolver } from "@hookform/resolvers/valibot";
import { Check } from "lucide-react";
import { useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import { type IEmailSubs, email_subs } from "types/hubspot-subscription";

export function SubscriptionForm() {
  const fetcher = useFetcher<"success" | "error">();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useRemixForm<IEmailSubs>({
    resolver: valibotResolver(email_subs),
  });

  return (
    <fetcher.Form
      action="/"
      method="POST"
      className="grid content-start"
      onSubmit={handleSubmit}
    >
      <div className="grid mb-3">
        <input
          {...register("email")}
          className="text-[#000000] opacity-[.9] p-3 rounded-md font-normal text-base md:text-sm border border-gray-l3 w-full outline-blue-d1"
          placeholder="Enter your email"
          disabled={fetcher.state === "submitting"}
        />
        <p className="empty:hidden w-full text-red-d2 text-left mt-0.5 text-xs">
          {errors.email?.message}
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
        className="sm:justify-self-start rounded-full px-5 py-2 btn-blue text-sm font-medium"
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
