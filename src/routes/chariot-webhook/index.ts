import crypto from "node:crypto";
import { resp } from "helpers/https";
import { type ActionFunction, href } from "react-router";
import { type Settled, to_final } from "../helpers/donation";
import { onholddb } from ".server/aws/db";
import { chariot_envs } from ".server/env";
import { chariot, qstash } from ".server/sdks";

export const action: ActionFunction = async ({ request }) => {
  try {
    const sig = request.headers.get("chariot-webhook-signature");
    const body = await request.text();

    if (!sig) return resp.err(403, "missig signature header");

    // Verify received payload
    const timestamp = sig.match(/[^t=]*\Z/g)![0];
    const sig_hash = sig.split("v1=")[1];

    const signed = `${timestamp}.${body}`;
    const hash = crypto
      .createHmac("sha256", chariot_envs.signing_key)
      .update(signed)
      .digest("hex");

    if (hash !== sig_hash) return resp.status(201);

    const payload = JSON.parse(body);
    const grant = await chariot.getGrant(payload.associated_object_id);
    console.info(payload, grant);

    if (grant.status === "Canceled") {
      await onholddb.del(grant.id);
      console.info(`chariot grant:${grant.id} cancelled and deleted`);
      return resp.status(202);
    }

    if (grant.status !== "Completed") {
      console.info(`${grant.id} status:${grant.status}`);
      //avoid retry
      return resp.status(203);
    }

    const gross = grant.amount / 100;
    const fee = (grant.feeDetail?.total ?? 0) / 100;

    const settlement: Settled = {
      net: gross - fee,
      fee,
      in: { id: "fiat", currency: "USD", hash: grant.id },
    };

    const order = await onholddb.item(grant.id);

    if (!order) return resp.status(204);
    const final = to_final(order, settlement);

    const base_url = new URL(request.url).origin;
    await qstash.publishJSON({
      url: `${base_url}/q/final-recorder`,
      body: final,
      retries: 0,
      deduplicationId: order.transactionId,
      failureCallback: `${base_url}${href("/failure-callback")}`,
    });
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return resp.err(500, "something wen't wrong");
  }
};
