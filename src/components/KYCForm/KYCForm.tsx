import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { placeHolderCountryOption } from "components/CountrySelector";
import { useNavigate } from "react-router";
import { Form } from "./Form";
import type { FV } from "./schema";

export default function KycForm() {
  const navigate = useNavigate();
  const init: FV = {
    name: { first: "", last: "" },
    address: { street: "", complement: "" },
    city: "",
    postalCode: "",
    country: placeHolderCountryOption,
    usState: { label: "", value: "" },
    state: "",
    kycEmail: "",
  };

  return (
    <Dialog
      open
      onClose={() =>
        navigate(
          { pathname: ".." },
          { replace: true, preventScrollReset: true }
        )
      }
    >
      <DialogBackdrop className="fixed z-40 inset-0 bg-black/30 data-[closed]:opacity-0" />
      <DialogPanel className="fixed-center z-50 isolate w-full max-w-[95vw] max-h-[95vh] sm:max-w-md overflow-y-auto scroller border border-gray-l4 bg-gray-l6 dark:bg-blue-d5 dark:text-white rounded">
        <Form {...init} />
      </DialogPanel>
    </Dialog>
  );
}
