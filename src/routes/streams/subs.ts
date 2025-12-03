import { resp } from "helpers/https";
import type { ISub } from "lib/subscriptions";
import type { ActionFunction } from "react-router";
import type { TPayload } from "./types";
import { stripe } from ".server/sdks";
import { is_resp, qstash_body } from ".server/utils";

export const action: ActionFunction = async ({ request }) => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

  const p: TPayload<ISub> = JSON.parse(b);
  console.info(p);

  if (p.type === "modify") {
    if (p.prev.status === "active" && p.curr.status === "cancelled") {
      await stripe.subscriptions.cancel(p.curr.id, {
        cancellation_details: {
          comment: p.curr.status_cancel_reason,
        },
      });
      return resp.status(200, `subscription ${p.curr.id} cancelled`);
    }
  }

  return resp.status(200, "no action taken");
};
