import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { search } from "helpers/https";
import { CircleAlert, X } from "lucide-react";
import {
  NavLink,
  useFetcher,
  useNavigate,
  useSearchParams,
} from "react-router";

type Props = {
  isDefault: boolean;
  isWithHeir: boolean;
};

export { delete_action as action } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";
export default function DeletePrompt() {
  const [params] = useSearchParams();
  const { default: d, with_heir } = search(params);
  const isDefault = d === "true";
  const isWithHeir = with_heir === "true";
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
      <Content isDefault={isDefault} isWithHeir={isWithHeir} />
    </Dialog>
  );
}

function Content({ isDefault, isWithHeir }: Props) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";
  const [canProceed, message] =
    isDefault && isWithHeir
      ? [false, "Kindly set another payout method as default before deleting"]
      : isDefault
        ? [
            true,
            "Your Nonprofit must have at least one banking connection approved in order to receive payouts. Banking connections that are 'Under Review' do not count towards this and are not eligible to receive payouts until approved. Do you want to proceed with this deletion?",
          ]
        : [true, "Are you sure you want to delete this payment method?"];

  return (
    <DialogPanel className="fixed-center z-10 grid content-start justify-items-center text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden">
      <div className="relative w-full">
        <p className="sm:text-xl font-bold text-center border-b bg-blue-l5 dark:bg-blue-d7 border-gray-l3 p-5">
          Delete payout method
        </p>
        <NavLink
          to=".."
          aria-disabled={isSubmitting}
          className="[&:is(.pending)]:text-gray border border-gray-l3 p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 aria-disabled:text-gray-l2"
        >
          <X className="text-lg sm:text-2xl" />
        </NavLink>
      </div>
      <CircleAlert size={80} className="mt-6 text-red" />

      <div className="p-6 text-center text-gray dark:text-gray-l2">
        {message}
      </div>

      {canProceed && (
        <fetcher.Form
          method="DELETE"
          className="p-3 sm:px-8 sm:py-4 flex items-center justify-end gap-4 w-full text-center sm:text-right bg-blue-l5 dark:bg-blue-d7 border-t border-gray-l3"
        >
          <NavLink
            to=".."
            aria-disabled={isSubmitting}
            type="button"
            className="btn-outline btn text-sm px-8 py-2"
          >
            Cancel
          </NavLink>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-blue px-8 py-2 text-sm"
          >
            Proceed
          </button>
        </fetcher.Form>
      )}
    </DialogPanel>
  );
}
