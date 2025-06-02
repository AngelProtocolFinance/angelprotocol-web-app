import AnvilEmbedFrame from "@anvilco/anvil-embed-frame";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import type { LoaderData } from "./api";

type FormType = "w9" | "w8ben" | null;

export { action, loader } from "./api";
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
  const [selectedForm, setSelectedForm] = useState<FormType>(null);

  if (selectedForm) {
    const title =
      selectedForm === "w9"
        ? "W-9 Form ( US Residents )"
        : "W-8BEN Form ( Non-US Residents )";
    const form_url = selectedForm === "w9" ? props.w9_url : props.w8ben_url;
    return (
      <TaxForm
        title={title}
        form_url={form_url}
        on_back={() => setSelectedForm(null)}
      />
    );
  }

  return (
    <DialogPanel className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-lg rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Tax Forms Required</h2>
        <p className="text-gray">
          To receive payout, kindly fill out the appropriate tax form
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setSelectedForm("w9")}
          className="w-full p-4 border border-gray-l3 rounded-lg hover:bg-gray-l4 transition-colors text-left"
        >
          <div className="font-semibold text-gray-d4">W-9 Form</div>
          <div className="text-sm text-gray">For US residents</div>
        </button>

        <button
          onClick={() => setSelectedForm("w8ben")}
          className="w-full p-4 border border-gray-l3 rounded-lg hover:bg-gray-l4 transition-colors text-left"
        >
          <div className="font-semibold text-gray-d4">W-8BEN Form</div>
          <div className="text-sm text-gray">For non-US residents</div>
        </button>
      </div>
    </DialogPanel>
  );
}

interface ITaxForm {
  title: string;
  form_url: string;
  on_back: () => void;
}
function TaxForm({ form_url, title, on_back }: ITaxForm) {
  const navigate = useNavigate();

  return (
    <DialogPanel className="fixed inset-0 z-10 grid grid-rows-[auto_1fr] content-start text-gray-d4 bg-white p-6 overflow-scroll">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={on_back}
          className="text-gray hover:text-gray-d4 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="relative">
        <AnvilEmbedFrame
          className="fixed w-full h-full"
          scroll="auto"
          iframeURL={form_url}
          onEvent={(ev: any) => {
            console.log(ev);
            if (ev.action !== "weldComplete") return;
            navigate(
              { pathname: "..", search: `?weld_data=${ev.weldDataEid}` },
              { replace: true, preventScrollReset: true }
            );
          }}
          style={{ border: "none" }}
        />
      </div>
    </DialogPanel>
  );
}
