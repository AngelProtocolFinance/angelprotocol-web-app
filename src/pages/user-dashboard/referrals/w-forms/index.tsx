import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
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

  if (selectedForm === "w9") {
    return <W9Form onBack={() => setSelectedForm(null)} />;
  }

  if (selectedForm === "w8ben") {
    return <W8BenForm onBack={() => setSelectedForm(null)} />;
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

function W9Form({ onBack }: { onBack: () => void }) {
  return (
    <DialogPanel className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-2xl rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">W-9 Form (US Residents)</h2>
        <button
          onClick={onBack}
          className="text-gray hover:text-gray-d4 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="bg-gray-l4 rounded-lg p-8 text-center">
        {/* W-9 form placeholder */}
        <p className="text-gray">W-9 Form will be implemented here</p>
      </div>
    </DialogPanel>
  );
}

function W8BenForm({ onBack }: { onBack: () => void }) {
  return (
    <DialogPanel className="fixed-center z-10 grid text-gray-d4 bg-white sm:w-full w-[90vw] sm:max-w-2xl rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">W-8BEN Form (Non-US Residents)</h2>
        <button
          onClick={onBack}
          className="text-gray hover:text-gray-d4 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="bg-gray-l4 rounded-lg p-8 text-center">
        {/* W-8BEN form placeholder */}
        <p className="text-gray">W-8BEN Form will be implemented here</p>
      </div>
    </DialogPanel>
  );
}
