import AnvilEmbedFrame from "@anvilco/anvil-embed-frame";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
import { IS_TEST } from "constants/env";
import { useState } from "react";

type FormType = "w9" | "w8ben" | null;

export { action, loader } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";

export default function Form() {
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
      <Content />
    </Dialog>
  );
}

function Content() {
  const [selectedForm, setSelectedForm] = useState<FormType>(null);

  if (selectedForm) {
    return (
      <TaxForm formType={selectedForm} onBack={() => setSelectedForm(null)} />
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
function TaxForm({
  formType,
  onBack,
}: {
  formType: "w9" | "w8ben";
  onBack: () => void;
}) {
  const navigate = useNavigate();

  const formConfig = {
    w9: {
      title: "W-9 Form (US Residents)",
      iframeURL: `https://app.useanvil.com/form/better-giving/irs-w9${IS_TEST ? `?test=true` : ""}`,
    },
    w8ben: {
      title: "W-8BEN Form (Non-US Residents)",
      iframeURL: `https://app.useanvil.com/weld/better-giving/fw8ben${IS_TEST ? `?test=true` : ""}`,
    },
  };

  const config = formConfig[formType];

  return (
    <DialogPanel className="fixed inset-0 z-10 grid grid-rows-[auto_1fr] content-start text-gray-d4 bg-white p-6 overflow-scroll">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{config.title}</h2>
        <button
          onClick={onBack}
          className="text-gray hover:text-gray-d4 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="relative">
        <AnvilEmbedFrame
          className="fixed w-full h-full"
          scroll="auto"
          iframeURL={config.iframeURL}
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
