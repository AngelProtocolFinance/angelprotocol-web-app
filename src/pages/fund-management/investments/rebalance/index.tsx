import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import type { ILog } from "lib/nav";
import { useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { RebalanceForm } from "./form";
import { Review } from "./review";
import type { State } from "./types";
export { loader, action } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: data }: Route.ComponentProps) {
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
      <DialogPanel className="fixed-center z-10 dark:text-white bg-white dark:bg-blue-d4 w-[90vw] rounded-sm overflow-hidden">
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
      {state.type === "review" && <Review fv={state.data} ltd={props} />}

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
            onClick={() => setState((x) => ({ ...x, type: "form" }))}
          >
            Edit
          </button>
        )}
        <button
          disabled={fetcher.state !== "idle"}
          form={state.type === "form" ? "rebalance-form" : undefined}
          type={state.type === "form" ? "submit" : "button"}
          onClick={
            state.type === "review"
              ? () =>
                  fetcher.submit(state.data.txs, {
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
