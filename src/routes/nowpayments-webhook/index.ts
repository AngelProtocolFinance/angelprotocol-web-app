import crypto from "node:crypto";
import type { NP } from "@better-giving/nowpayments/types";
import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { parse, stage as schema } from "routes/types/donation-message";
import { handle_confirming } from "./handlers/confirming";
import { handle_failed } from "./handlers/failed";
import { handle_settled } from "./handlers/settled";
import { onholddb } from ".server/aws/db";
import { np_envs } from ".server/env";
import { aws_monitor } from ".server/sdks";

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const stage = parse(schema, params.stage);
  const sig = request.headers.get("x-nowpayments-sig");
  if (!sig) return resp.err(400, "invalid request");

  /// hash payload ///
  const payment: NP.PaymentPayload = await request.json();

  const paymentSorted: any = {};
  for (const [k, v] of Object.entries(payment).toSorted(([a], [b]) =>
    a.localeCompare(b)
  )) {
    paymentSorted[k] = v;
  }

  const hmac = crypto.createHmac("sha512", np_envs.ipnSecret);
  hmac.update(JSON.stringify(paymentSorted));
  const payloadSig = hmac.digest("hex");

  if (payloadSig !== sig) {
    return resp.err(400, "invalid request");
  }

  const status = payment.payment_status;

  try {
    if (
      // can be considered `pending`
      status === "sending" ||
      //if a donation failed (e.g. less than min amount) we would proceed with the actual amount (if still processable - not too small)
      status === "refunded" ||
      // `confirming` event switches the intent to `pending`
      status === "confirmed"
    ) {
      console.info(status, payment);
      return resp.txt("unhandled");
    }

    if (status === "waiting") {
      const res = await onholddb.update(payment.order_id, {
        payment_id: payment.payment_id,
      });
      console.info("waiting", res);
      return resp.json(res);
    }

    if (status === "confirming") {
      const res = await handle_confirming(payment, stage);
      console.info("confirming", res);
      return resp.json(res);
    }

    if (status === "expired") {
      const res = await onholddb.del(payment.order_id);
      console.info("expired", res.Attributes);
      return resp.json(res.Attributes ?? {});
    }

    if (status === "failed") {
      const res = await handle_failed(payment);
      console.info(`deleted failed payment:${payment.payment_id}`);
      return resp.json(res.Attributes ?? {});
    }

    const res = await handle_settled(payment, new URL(request.url).origin);

    await aws_monitor.sendAlert({
      from: `nowpayments-webhook-${stage}`,
      title: "Donation settled",
      body: JSON.stringify(payment),
      fields: [{ name: "message id", value: res.messageId }],
    });

    return resp.txt("Donation settled");
  } catch (err) {
    await aws_monitor.sendAlert({
      from: `nowpayments-webhook-${stage}`,
      title: "Unknown error occured",
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });

    return resp.err(500, "Unknown error occured");
  }
};
