import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ArrowDownToLine, CircleCheck } from "lucide-react";
import { Link, useLoaderData, useNavigate, useNavigation } from "react-router";
import type { LoaderData } from "./api";

export { loader } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";

export default function Form() {
  const navigate = useNavigate();
  const data = useLoaderData() as LoaderData;

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
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <DialogPanel className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6 text-center">
      <CircleCheck className="text-green mx-auto" size={70} />
      <h1 className="text-2xl uppercase text-center mt-10 mb-4">
        Tax Form submission saved!
      </h1>

      <a
        download
        href={`/api/anvil-doc/${props.doc_eid}`}
        className="text-blue hover:text-blue-d1 active:text-blue-d2 mb-4 inline-block"
      >
        <ArrowDownToLine size={18} className="inline bottom-px relative mr-1" />
        <span className="uppercase text-sm font-semibold">download</span>
      </a>

      <Link
        aria-disabled={isLoading}
        className="w-full max-w-[26.25rem] justify-self-center btn btn-blue text-sm mt-4"
        to="../payout"
      >
        Continue
      </Link>
    </DialogPanel>
  );
}
