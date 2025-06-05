import crypto from "node:crypto";
import type { ActionFunction } from "@vercel/remix";
import { delete_order, get_order } from "routes/helpers/onhold";
import { type Settled, to_final } from "../helpers/donation";
import { chariot_envs } from ".server/env";
import { chariot, qstash } from ".server/sdks";

export const action: ActionFunction = async ({ request, params }) => {
  try {
    console.log(request.headers.entries(), request, params);
    const sig = request.headers.get("chariot-webhook-signature");
    const body = await request.text();

    if (!sig) return new Response("Missing signature header", { status: 403 });

    // Verify received payload
    const timestamp = sig.match(/[^t=]*\Z/g)![0];
    const sig_hash = sig.split("v1=")[1];

    const signed = timestamp + "." + body;
    const hash = crypto
      .createHmac("sha256", chariot_envs.signing_key)
      .update(signed)
      .digest("hex");

    if (hash !== sig_hash) {
      return new Response("Invalid signature", { status: 201 });
    }

    const payload = JSON.parse(body);
    const grant = await chariot.getGrant(payload.associated_object_id);

    if (grant.status === "Canceled") {
      await delete_order(grant.id);
      console.info(`chariot grant:${grant.id} cancelled and deleted`);
      return new Response("Grant cancelled", { status: 202 });
    }

    if (grant.status !== "Completed") {
      console.log(`${grant.id} status:${grant.status}`);
      //avoid retry
      return new Response("Grant not completed", { status: 203 });
    }

    const gross = grant.amount / 100;
    const fee = (grant.feeDetail?.total ?? 0) / 100;

    const settlement: Settled = {
      net: gross - fee,
      fee,
      in: { id: "fiat", currency: "USD", hash: grant.id },
    };

    const order = await get_order(grant.id);

    if (!order) {
      return new Response(`Order not found for grant:${grant.id}`, {
        status: 204,
      });
    }
    const final = to_final(order, settlement);

    const origin = new URL(request.url).origin;
    await qstash.publishJSON({
      url: `${origin}/q/final-recorder`,
      body: final,
      retries: 0,
      deduplicationId: order.transactionId,
    });
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("something went wrong :((", { status: 500 });
  }
};
