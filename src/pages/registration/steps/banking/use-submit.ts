import type { Update } from "@better-giving/registration/update";
import { useFetcher } from "@remix-run/react";
import type { OnSubmit } from "components/bank-details";

export default function useSubmit() {
  const fetcher = useFetcher();

  const submit: OnSubmit = async (recipient, bankStatementUrl) => {
    const update: Update = {
      type: "banking",
      bank_statement: {
        name: bankStatementUrl,
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
