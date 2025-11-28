import { $req } from "@better-giving/schemas";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field } from "components/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useFetcher, useNavigate, useSearchParams } from "react-router";
import { object } from "valibot";
export { action } from "./api";

function Content() {
  const [search] = useSearchParams();
  const recipient_name = search.get("recipient") ?? "Unknown";

  const fetcher = useFetcher({ key: "cancel-subscription" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(object({ reason: $req })),
    defaultValues: { reason: "" },
  });

  return (
    <DialogPanel
      as="form"
      onSubmit={handleSubmit((fv) =>
        fetcher.submit(fv, { encType: "application/json", method: "POST" })
      )}
      className="fixed-center z-10 grid content-start justify-items-center text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
          Cancel Recurring Donation
        </p>
        <Link
          aria-disabled={fetcher.state !== "idle"}
          preventScrollReset
          replace
          to=".."
          className="border border-gray-l3 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l2 dark:disabled:text-gray-d3 dark:disabled:border-gray-d3"
        >
          <X className="text-lg sm:text-2xl" />
        </Link>
      </div>

      <p className="px-6 pb-4 text-gray dark:text-gray-l2 mt-4">
        <span className="block">
          You are about to cancel your recurring donations to
        </span>
        <span className="font-semibold">{recipient_name}</span>. This action
        cannot be undone. You will no longer be charged for this subscription.
      </p>

      <div className="px-6 pb-4 text-center text-gray dark:text-gray-l2" />

      <div className="px-6 w-full pb-6">
        <Field
          {...register("reason")}
          required
          type="textarea"
          label="Reason for cancellation"
          placeholder="Please tell us why you're canceling this recurring donation..."
          error={errors.reason?.message}
        />
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 w-full  sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l3">
        <Link
          to={".."}
          aria-disabled={fetcher.state === "submitting"}
          type="button"
          className="btn-outline btn text-sm px-8 py-2"
          preventScrollReset
          replace
        >
          Keep your support
        </Link>
        <button
          disabled={fetcher.state !== "idle"}
          type="submit"
          className="btn btn-red px-8 py-2 text-sm"
        >
          {fetcher.state === "submitting" ? "Canceling..." : "Cancel"}
        </button>
      </div>
    </DialogPanel>
  );
}

export default function CancelPrompt() {
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Content />
    </Dialog>
  );
}
