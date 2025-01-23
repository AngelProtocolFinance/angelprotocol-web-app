import { ap, ver } from "api/api";
import type { CreateRecipientRequest } from "types/aws";

export function createRecipient(payload: CreateRecipientRequest) {
  return ap.post(`${ver(1)}/wise-proxy/v1/accounts`, {
    json: payload,
    throwHttpErrors: false,
  });
}
