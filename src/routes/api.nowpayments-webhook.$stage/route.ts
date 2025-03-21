import crypto from "node:crypto";
import type { NP } from "@better-giving/nowpayments/types";
import type { ActionFunction } from "@vercel/remix";
import { parse, stage as schema } from "routes/types";
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
  if (!sig) return new Response("invalid request", { status: 400 });

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
    return new Response("invalid request", { status: 400 });
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
      console.log(status, payment);
      return new Response("unhandled", { status: 200 });
    }

    if (status === "waiting") {
      const res = await handleWaiting(payment.payment_id, payment.order_id);
      console.log("waiting", res.Attributes);
      // return v2Res(200, res.Attributes ?? {});
      return new Response(JSON.stringify(res.Attributes ?? {}), {
        status: 200,
      });
    }

    if (status === "confirming") {
      const res = await handleConfirming(payment, stage);
      console.log("confirming", res.Attributes);
      // return v2Res(200, res.Attributes ?? {});
      return new Response(JSON.stringify(res.Attributes ?? {}), {
        status: 200,
      });
    }

    if (status === "expired") {
      const res = await handleExpired(payment.order_id);
      console.log("expired", res.Attributes);
      // return v2Res(200, res.Attributes ?? {});
      return new Response(JSON.stringify(res.Attributes ?? {}), {
        status: 200,
      });
    }

    if (status === "failed") {
      const res = await handleFailed(payment);
      console.log(`deleted failed payment:${payment.payment_id}`);
      // return v2Res(200, res.Attributes ?? {});
      return new Response(JSON.stringify(res.Attributes ?? {}), {
        status: 200,
      });
    }

    await handleSettled(payment);

    await discordAwsMonitor.sendAlert({
      from: `nowpayments-webhook-${stage}`,
      title: "Donation settled",
      body: JSON.stringify(payment),
    });

    return new Response("Donation settled", { status: 200 });
  } catch (err) {
    await discordAwsMonitor.sendAlert({
      from: `nowpayments-webhook-${stage}`,
      title: "Unknown error occured",
      body: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    });

    return new Response("Unknown error occured", { status: 500 });
  }
};
