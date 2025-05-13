import { Link, useFetcher } from "@remix-run/react";
import { BankDetails } from "components/bank-details";
import { type IPromptV2, PromptV2 } from "components/prompt";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import FormButtons from "./form-buttons";

export { action } from "./api";
export { ErrorBoundary } from "components/error";

export default function Payout() {
  const fetcher = useFetcher();
  const [prompt, setPrompt] = useState<IPromptV2>();

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
        isLoading={fetcher.state !== "idle"}
      />
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </>
  );
}
