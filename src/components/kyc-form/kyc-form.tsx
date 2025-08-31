import { Modal } from "components/modal";
import { useNavigate } from "react-router";
import { Form } from "./form";
import type { FV } from "./schema";

export default function KycForm() {
  const navigate = useNavigate();
  const init: FV = {
    name: { first: "", last: "" },
    address: { street: "", complement: "" },
    city: "",
    postalCode: "",
    country: "",
    usState: "",
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
      classes="fixed-center grid z-50 isolate w-full max-w-[95vw] max-h-[95vh] sm:max-w-md overflow-y-auto scroller border border-gray-l3 bg-gray-l6 dark:bg-blue-d5 dark:text-white rounded-sm"
    >
      <Form {...init} />
    </Modal>
  );
}
