import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ExtLink } from "components/ext-link";
import { useNavigate } from "react-router";
import type { Route } from "./+types";
import type { LoaderData } from "./api";

export { action, loader } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";

export default function Page({ loaderData: data }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { replace: true, preventScrollReset: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Content {...data} />
    </Dialog>
  );
}

function Content(props: LoaderData) {
  return (
    <DialogPanel className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Tax Forms Required</h2>
        <p className="text-gray">
          To receive payout, kindly fill out the appropriate tax form
        </p>
      </div>

      <div className="space-y-4">
        <ExtLink
          href={props.w9_url}
          className="w-full block p-4 border border-gray-l3 rounded-lg hover:bg-gray-l4 transition-colors text-left"
        >
          <div className=" font-medium text-gray-d4">For US Residents</div>
          <div className="text-sm text-gray">
            Complete this W-9 tax status form
          </div>
        </ExtLink>

        <ExtLink
          href={props.w8ben_url}
          className="w-full block p-4 border border-gray-l3 rounded-lg hover:bg-gray-l4 transition-colors text-left"
        >
          <div className=" font-medium text-gray-d4">For Non-US Residents</div>
          <div className="text-sm text-gray">
            Complete this W-8BEN tax status form
          </div>
        </ExtLink>
      </div>
    </DialogPanel>
  );
}
