import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import type { CreateRecipientRequest } from "types/aws";

export function createRecipient(payload: CreateRecipientRequest) {
  return fetch(`${APIs.aws}/${v(1)}/wise-proxy/v1/accounts`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });
}
