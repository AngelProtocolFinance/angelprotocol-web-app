import type { ILog } from "@better-giving/nav-history";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { RebalanceForm } from "./form";
import type { State } from "./types";
export { loader, action } from "./api";

export default function Page() {
  const navigate = useNavigate();
  const data = useLoaderData() as ILog;
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
        <Content {...data} />
      </DialogPanel>
    </Dialog>
  );
}

function Content(props: ILog) {
  const [state, setState] = useState<State>({ type: "form" });
  const fetcher = useFetcher();

  return (
    <div>
      {state.type === "form" && (
        <RebalanceForm
          composition={props.composition}
          init={state.data}
          on_submit={(x) => setState({ type: "review", data: x })}
        />
      )}

      <div className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l3">
        {state.type === "form" ? (
          <Link
            replace
            preventScrollReset
            to=".."
            aria-disabled={fetcher.state !== "idle"}
            className="btn-outline btn text-sm px-8 py-2"
          >
            Back
          </Link>
        ) : (
          <button
            className="btn-outline btn text-sm px-8 py-2"
            type="button"
            onClick={(x) => setState({ ...x, type: "form" })}
          >
            Edit
          </button>
        )}
        <button type="button" className="btn btn-blue px-8 py-2 text-sm">
          {state.type === "form" ? "Review" : "Submit"}
        </button>
      </div>
    </div>
  );
}
