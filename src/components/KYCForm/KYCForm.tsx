import { useNavigate } from "@remix-run/react";
import { placeHolderCountryOption } from "components/CountrySelector";
import { Modal } from "components/Modal";
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
    <Modal
      open={true}
      onClose={() =>
        navigate(
          { pathname: ".." },
          { replace: true, preventScrollReset: true }
        )
      }
      classes="fixed-center grid z-50 isolate w-full max-w-[95vw] max-h-[95vh] sm:max-w-md overflow-y-auto scroller border border-gray-l4 bg-gray-l6 dark:bg-blue-d5 dark:text-white rounded"
    >
      <Form {...init} />
    </Modal>
  );
}
