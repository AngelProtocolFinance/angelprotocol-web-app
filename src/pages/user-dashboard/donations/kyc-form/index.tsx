import { Modal } from "components/modal";
import { useNavigate } from "react-router";
import { Form } from "./form";
import type { FV } from "./schema";
import type { Route } from "./+types";

export { ErrorModal as ErrorBoundary } from "components/error";
export { action } from "./api";
export { loader } from "./api";

export default function Page({ params, loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  params.id;

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
      <Form user={loaderData} />
    </Modal>
  );
}
