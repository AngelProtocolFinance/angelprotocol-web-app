import type { ActionFunction } from "@vercel/remix";
import { etch_complete } from "./etch-complete";
import type { WebhookPayload } from "./types";
import { anvil_envs } from ".server/env";

/** don't return 4xx status, to prevent retries */
export const action: ActionFunction = async ({ request }) => {
  try {
    const p: WebhookPayload = await request.json();
    if (p.token !== anvil_envs.webhook_token) {
      return new Response("Invalid token", { status: 203 });
    }

    const origin = request.headers.get("origin");
    if (!origin) return new Response("origin header missing", { status: 205 });

    if (p.action === "etchPacketComplete") {
      await etch_complete(p.data, origin);
    }

    if (p.action === "signerComplete") {
    }
  } catch (err) {
    console.error(err);
  }
};
