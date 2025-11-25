import { Modal } from "components/modal";
import { useNavigate } from "react-router";
import type { Route } from "./+types";
import { Form } from "./form";

export { ErrorModal as ErrorBoundary } from "components/error";
export { action, loader } from "./api";

export default function Page({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

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
      <Form {...loaderData} />
    </Modal>
  );
}
