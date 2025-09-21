import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router";
import { LogForm } from "./log-form";
import { Review } from "./review";
import type { State } from "./types";
export { action } from "./api";

export default function Page() {
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
      <DialogPanel className="fixed-center z-10 dark:text-white bg-white dark:bg-blue-d4 w-full max-w-3xl max-h-[90vh] rounded-sm overflow-auto">
        <Content />
      </DialogPanel>
    </Dialog>
  );
}

function Content() {
  const [state, setState] = useState<State>({ type: "form" });
  const fetcher = useFetcher();

  return (
    <div>
      {state.type === "form" && (
        <LogForm
          init={state.fv}
          on_submit={(x, y) => setState({ type: "review", fv: x, shares: y })}
        />
      )}
      {state.type === "review" && (
        <Review amount={+state.fv.total} shares={state.shares} />
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
            disabled={fetcher.state !== "idle"}
            className="btn-outline btn text-sm px-8 py-2"
            type="button"
            onClick={() => setState((x) => ({ ...x, type: "form" }))}
          >
            Edit
          </button>
        )}
        <button
          disabled={fetcher.state !== "idle"}
          form={state.type === "form" ? "log-interest-form" : undefined}
          type={state.type === "form" ? "submit" : "button"}
          onClick={
            state.type === "review"
              ? () =>
                  fetcher.submit(state.fv, {
                    method: "post",
                    encType: "application/json",
                  })
              : undefined
          }
          className="btn btn-blue px-8 py-2 text-sm"
        >
          {state.type === "form" ? "Review" : "Submit"}
        </button>
      </div>
    </div>
  );
}
