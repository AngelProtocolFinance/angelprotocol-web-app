import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { etch_complete } from "./etch-complete";
import type { WebhookPayload } from "./types";
import { anvil_envs } from ".server/env";

/** don't return 4xx status, to prevent retries */
export const action: ActionFunction = async ({ request }) => {
  try {
    const p: WebhookPayload = await request.json();
    if (p.token !== anvil_envs.webhook_token) {
      return resp.status(200, "invalid token");
    }

    const h_origin = request.headers.get("origin");
    const h_x_forwarded_host = request.headers.get("x-forwarded-host");
    const h_x_forwarded_proto = request.headers.get("x-forwarded-proto");

    const base_url =
      h_origin ||
      (h_x_forwarded_host && h_x_forwarded_proto
        ? `${h_x_forwarded_proto}://${h_x_forwarded_host}`
        : null);

    if (!base_url) return resp.status(200, "origin header missing");

    if (p.action === "etchPacketComplete") {
      const signed = await etch_complete(p.data, base_url);
      return resp.txt(signed || "no doc url");
    }

    return resp.status(200, "no action taken");
  } catch (err) {
    console.error(err);
    return new Response("error", { status: 206 });
  }
};
