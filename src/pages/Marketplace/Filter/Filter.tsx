import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { X } from "lucide-react";
import Categories from "./Categories";
import Countries from "./Countries";
import Designations from "./Designations";
import KYCFilter from "./KYCFilter";
import VerificationFilter from "./VerificationFilter";

export default function Filter({ classes = "" }: { classes?: string }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  return (
    <Dialog
      open
      onClose={() =>
        navigate(
          { pathname: "..", search: params.toString() },
          { replace: true, preventScrollReset: true }
        )
      }
    >
      <DialogBackdrop className="fixed z-40 inset-0 bg-black/30 data-closed:opacity-0" />
      <DialogPanel
        className={`${classes} fixed-center z-50 isolate w-full max-w-[95vw] max-h-[95vh] sm:max-w-md overflow-y-auto scroller border border-gray-l4 bg-gray-l6 dark:bg-blue-d5 dark:text-white rounded-sm`}
      >
        <div className="bg-blue-l5 dark:bg-blue-d7 flex items-center p-4 border-b border-gray-l4">
          <p className="font-bold font-heading uppercase mr-auto">Filters</p>
          <button
            type="button"
            title="Reset all filters to their default values."
            onClick={() =>
              navigate(
                { pathname: "..", search: "" },
                { replace: true, preventScrollReset: true }
              )
            }
            className="text-navy-l1 dark:text-navy-l5 text-sm mr-4"
          >
            Clear Filters
          </button>
          <Link
            to={{ pathname: "..", search: params.toString() }}
            replace
            preventScrollReset
            className="active:text-blue-d1"
          >
            <X size={22} />
          </Link>
        </div>

        <div className="px-4 py-4">
          <label className="font-bold text-xs font-heading uppercase block mb-2">
            Countries
          </label>
          <Countries />
        </div>

        <div className="px-2 divide-y divide-gray-l3">
          <Designations />
          <KYCFilter />
          <VerificationFilter />
          <Categories />
        </div>
      </DialogPanel>
    </Dialog>
  );
}
