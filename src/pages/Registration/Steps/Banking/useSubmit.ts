import type { Update } from "@better-giving/registration/update";
import type { OnSubmit } from "components/BankDetails";
import { toFileName } from "helpers/uploadFile";
import { useFetcher } from "react-router";

export default function useSubmit() {
  const fetcher = useFetcher();

  const submit: OnSubmit = async (recipient, bankStatementUrl) => {
    const update: Update = {
      type: "banking",
      bank_statement: {
        name: toFileName(bankStatementUrl) ?? "bank statement",
        publicUrl: bankStatementUrl,
      },
      wise_recipient_id: recipient.id,
    };
    fetcher.submit(update, {
      method: "PATCH",
      action: ".",
      encType: "application/json",
    });
  };

  return { submit, isLoading: fetcher.state !== "idle" };
}
