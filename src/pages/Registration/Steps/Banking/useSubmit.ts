import type { Update } from "@better-giving/registration/update";
import type { OnSubmit } from "components/BankDetails";
import { getFilePreviews } from "helpers";
import { useFetcher } from "react-router-dom";

export default function useSubmit() {
  const fetcher = useFetcher();

  const submit: OnSubmit = async (recipient, file) => {
    const bankStatementPreview = await getFilePreviews({
      bankStatementFile: { previews: [], files: [file] },
    });

    const update: Update = {
      type: "banking",
      bank_statement: bankStatementPreview.bankStatementFile[0],
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
