import type { Update } from "@better-giving/registration/update";
import type { OnSubmit } from "components/BankDetails";
import { uploadFile } from "helpers/uploadFile";
import { useFetcher } from "react-router-dom";
import { toast } from "sonner";

export default function useSubmit() {
  const fetcher = useFetcher();

  const submit: OnSubmit = async (recipient, file) => {
    const bankStatement = await uploadFile(file, "endow-reg");
    if (!bankStatement) {
      toast.error("Failed to upload bank statement");
      return;
    }

    const update: Update = {
      type: "banking",
      bank_statement: bankStatement,
      wise_recipient_id: recipient.id,
    };
    fetcher.submit(update, {
      method: "patch",
      action: ".",
      encType: "application/json",
    });
  };

  return { submit, isLoading: fetcher.state !== "idle" };
}
