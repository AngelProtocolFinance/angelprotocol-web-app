import type { CreateRecipientRequest } from "types/bank-details";

export async function create_recipient(payload: CreateRecipientRequest) {
  return fetch(`/api/wise/v1/accounts`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "content-type": "application/json" },
  });
}
