import { Link, useFetcher, useParams } from "@remix-run/react";
import BankDetails, { type OnSubmit } from "components/bank-details";
import Group from "components/group";
import { type IPromptV2, PromptV2 } from "components/prompt";
import { errorPrompt } from "helpers/error-prompt";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import FormButtons from "./FormButtons";

export { newBanking as action } from "./api";
export { ErrorBoundary } from "components/error";

export default function Banking() {
  const { id: endowIdParam = "" } = useParams();
  const fetcher = useFetcher();
  const [prompt, setPrompt] = useState<IPromptV2>();

  const submit: OnSubmit = async (recipient, bankStatementUrl) => {
    try {
      const { id, details, currency } = recipient;
      //creating account return V1Recipient and doesn't have longAccount summary field
      const bankSummary = `${currency.toUpperCase()} account ending in ${
        details.accountNumber?.slice(-4) || "0000"
      } `;

      fetcher.submit(
        {
          wiseRecipientID: id.toString(),
          bankSummary,
          endowmentID: +endowIdParam,
          bankStatementFile: {
            name: bankStatementUrl,
            publicUrl: bankStatementUrl,
          },
        },
        { action: ".", method: "POST", encType: "application/json" }
      );
    } catch (error) {
      setPrompt(
        errorPrompt(error, { context: "submitting banking application" })
      );
    }
  };

  return (
    <>
      <Link
        to={"../banking"}
        className="flex items-center gap-1 mb-4 text-blue hover:text-blue-l1 text-sm uppercase"
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </Link>
      <Group
        className="max-w-4xl"
        title="Bank account details"
        description="The following information will be used to register your bank account that will be used to withdraw your funds."
      >
        <BankDetails
          FormButtons={FormButtons}
          onSubmit={submit}
          isLoading={fetcher.state !== "idle"}
        />
      </Group>
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </>
  );
}
