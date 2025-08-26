import crypto from "node:crypto";
import type { NP } from "@better-giving/nowpayments/types";
import type { ActionFunction } from "react-router";
import { resp } from "routes/helpers/resp";
import { parse, stage as schema } from "routes/types/donation-message";
import { handleConfirming } from "./handlers/confirming";
import { handleExpired } from "./handlers/expired";
import { handleFailed } from "./handlers/failed";
import { handleSettled } from "./handlers/settled";
import { handleWaiting } from "./handlers/waiting";
import { npEnvs } from ".server/env";
import { discordAwsMonitor } from ".server/sdks";

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

  const hmac = crypto.createHmac("sha512", npEnvs.ipnSecret);
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
      const res = await handleWaiting(payment.payment_id, payment.order_id);
      console.info("waiting", res.Attributes);
      return resp.json(res.Attributes ?? {});
    }

    if (status === "confirming") {
      const res = await handleConfirming(payment, stage);
      console.info("confirming", res.Attributes);
      return resp.json(res.Attributes ?? {});
    }

    if (status === "expired") {
      const res = await handleExpired(payment.order_id);
      console.info("expired", res.Attributes);
      return resp.json(res.Attributes ?? {});
    }

    if (status === "failed") {
      const res = await handleFailed(payment);
      console.info(`deleted failed payment:${payment.payment_id}`);
      return resp.json(res.Attributes ?? {});
    }

    const res = await handleSettled(payment, new URL(request.url).origin);

    await discordAwsMonitor.sendAlert({
      from: `nowpayments-webhook-${stage}`,
      title: "Donation settled",
      body: JSON.stringify(payment),
      fields: [{ name: "message id", value: res.messageId }],
    });

    return resp.txt("Donation settled");
  } catch (err) {
    await discordAwsMonitor.sendAlert({
      from: `nowpayments-webhook-${stage}`,
      title: "Unknown error occured",
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });

    return resp.err(500, "Unknown error occured");
  }
};
