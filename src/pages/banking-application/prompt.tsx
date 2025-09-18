import type { TStatus } from "@better-giving/banking-applications";
import {
  type IUpdate,
  update,
} from "@better-giving/banking-applications/schema";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ChevronRight, X } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Link, useFetcher, useNavigate } from "react-router";
import { useRemixForm } from "remix-hook-form";

type Props = {
  verdict: TStatus;
};

export function Prompt(props: Props) {
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
      <DialogPanel className="fixed-center z-10 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden">
        <Content {...props} />
      </DialogPanel>
    </Dialog>
  );
}

function Content({ verdict }: Props) {
  const fetcher = useFetcher({
    key: `banking-application-${verdict}`,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<IUpdate>({
    resolver: valibotResolver(update),
  });
  const reason_id = "reject-reason";

  return (
    <fetcher.Form
      onSubmit={handleSubmit}
      method="POST"
      className="grid content-start justify-items-center text-gray-d4"
    >
      <input type="hidden" value={verdict} name="type" />
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
          Banking application
        </p>
        <Link
          to=".."
          aria-disabled={fetcher.state !== "idle"}
          className="border border-gray-l3 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l2 dark:disabled:text-gray-d3 dark:disabled:border-gray-d3"
        >
          <X className="text-lg sm:text-2xl" />
        </Link>
      </div>
      <p className="px-6 pb-4 text-center text-gray dark:text-gray-l2 mt-4 font-semibold">
        You are about to {verdict} this banking application.
      </p>

      {verdict === "approved" ? (
        <div className="px-6 pb-4 text-center text-gray dark:text-gray-l2">
          This will immediately payout all pending funds to newly linked bank
          account and is irreversible.
        </div>
      ) : null}

      <div className="flex items-center gap-2 mb-6">
        <Status classes="bg-gray-d2">Under review</Status>
        <ChevronRight size={20} />
        {verdict === "approved" ? (
          <Status classes="bg-green">Approved</Status>
        ) : (
          <Status classes="bg-red">Rejected</Status>
        )}
      </div>

      {verdict === "rejected" && (
        <div className="px-6 w-full pb-6 grid">
          <label htmlFor={reason_id} className="label mb-2" data-required>
            Reason for rejection:
          </label>
          <textarea
            {...register("reason")}
            id={reason_id}
            className="field-input"
          />
          <span className="empty:hidden text-xs text-red mt-1">
            {errors.reason?.message}
          </span>
        </div>
      )}

      <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l3">
        <Link
          replace
          preventScrollReset
          to=".."
          aria-disabled={fetcher.state !== "idle"}
          className="btn-outline btn text-sm px-8 py-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-blue px-8 py-2 text-sm">
          Submit
        </button>
      </div>
    </fetcher.Form>
  );
}

function Status(props: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`${
        props.classes ?? ""
      } text-white px-2 py-1 text-xs uppercase rounded`}
    >
      {props.children}
    </div>
  );
}
