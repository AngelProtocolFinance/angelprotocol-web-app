import type { IRegUpdate } from "@better-giving/reg";
import { useFetcher } from "@remix-run/react";
import type { OnSubmit } from "components/bank-details";

export default function useSubmit() {
  const fetcher = useFetcher();

  const submit: OnSubmit = async (recipient, bank_statement) => {
    const update: IRegUpdate = {
      update_type: "banking",
      status: "01",
      o_bank_statement: bank_statement,
      o_bank_id: recipient.id.toString(),
    };
    fetcher.submit(update, {
      method: "PATCH",
      action: ".",
      encType: "application/json",
    });
  };

  return { submit, isLoading: fetcher.state !== "idle" };
}
