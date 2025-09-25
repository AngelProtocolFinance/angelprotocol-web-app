import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ChevronRight, X } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Link, useFetcher, useNavigate } from "react-router";
import type { ActionData } from "types/action";

type Props = {
  verdict: "approve" | "reject";
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
  const fetcher = useFetcher<ActionData<any>>({
    key: `tx-request-${verdict}`,
  });

  return (
    <fetcher.Form
      method="POST"
      className="grid content-start justify-items-center text-gray-d4"
    >
      <input type="hidden" value={verdict} name="verdict" />
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
          Redeem units request
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
        You are about to {verdict} this request.
      </p>

      <div className="flex items-center gap-2 mb-6">
        <Status classes="bg-gray-d2">Pending</Status>
        <ChevronRight size={20} />
        {verdict === "approve" ? (
          <Status classes="bg-green">Approved</Status>
        ) : (
          <Status classes="bg-red">Cancelled</Status>
        )}
      </div>

      <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l3">
        <Link
          replace
          preventScrollReset
          to=".."
          aria-disabled={fetcher.state !== "idle"}
          className="btn-outline btn text-sm px-8 py-2"
        >
          Back
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
