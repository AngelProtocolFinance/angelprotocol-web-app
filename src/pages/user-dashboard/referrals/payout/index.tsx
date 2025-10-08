import { BankDetails } from "components/bank-details";
import { type IPrompt, Prompt } from "components/prompt";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link, useFetcher } from "react-router";
import FormButtons from "./form-buttons";

export { action } from "./api";
export { ErrorBoundary } from "components/error";

export default function Payout() {
  const fetcher = useFetcher();
  const [prompt, setPrompt] = useState<IPrompt>();

  return (
    <>
      <Link
        to={"../referrals"}
        className="flex items-center gap-1 mb-4 text-blue hover:text-blue-l1 text-sm"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      <BankDetails
        FormButtons={FormButtons}
        onSubmit={async ({ id }) =>
          fetcher.submit(id.toString(), {
            method: "POST",
            encType: "text/plain",
          })
        }
        is_loading={fetcher.state !== "idle"}
      />
      {prompt && <Prompt {...prompt} onClose={() => setPrompt(undefined)} />}
    </>
  );
}
