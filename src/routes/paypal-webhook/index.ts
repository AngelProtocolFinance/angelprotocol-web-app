import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { to_final } from "routes/helpers/donation";
import { verified_body } from "./helpers";
import type { TWebhookEvent } from "./types";
import { onholddb } from ".server/aws/db";
import { paypal_orders, paypal_payments, qstash } from ".server/sdks";
import { is_resp } from ".server/utils";

export const action: ActionFunction = async ({ request }) => {
  try {
    const base_url = new URL(request.url).origin;
    const jsonstr = await verified_body(request);
    if (is_resp(jsonstr)) return jsonstr;

    const ev: TWebhookEvent = JSON.parse(jsonstr);

    console.info("[paypal webhook] received:", ev);

    switch (ev.event_type) {
      case "CHECKOUT.ORDER.APPROVED": {
        const order_id = ev.resource.id;
        const { result: order } = await paypal_orders.getOrder({
          id: order_id,
        });

        const {
          emailAddress: email,
          address: {
            addressLine1: l1,
            addressLine2: l2,
            adminArea1: state,
            adminArea2: city,
            postalCode: zip,
            countryCode: country,
          } = {},
          name: n,
        } = order.paymentSource?.paypal || order.paymentSource?.venmo || {};

        if (!email) {
          return resp.status(201, `missing email for order: ${order_id}`);
        }

        const onhold_id = order.purchaseUnits?.[0]?.customId;
        if (!onhold_id) {
          return resp.status(201, `missing onhold id for order: ${order_id}`);
        }

        const onhold = await onholddb.item(onhold_id);
        if (!onhold) {
          return resp.status(
            200,
            `onhold missing or have been processed: ${order_id}`
          );
        }
        const fn = [n?.givenName, n?.surname].filter(Boolean).join(" ") || "";
        const str = [l1, l2].filter(Boolean).join(" ") || "";
        //update donor info
        const res = await onholddb.update(ev.resource.id, {
          kycEmail: email,
          ...(fn && { fullName: fn }),
          ...(str && { streetAddress: str }),
          ...(city && { city }),
          ...(state && { state }),
          ...(zip && { postalCode: zip }),
          ...(country && { country }),
        });
        console.info(res);
        return resp.status(200, "updated onhold donor info");
      }
      case "PAYMENT.CAPTURE.COMPLETED": {
        const c_id = ev.resource.id;
        const { result: c } = await paypal_payments.getCapturedPayment({
          captureId: c_id,
        });
        const onhold_id = c.customId;
        if (!onhold_id)
          return resp.status(201, `missing onhold id for capture: ${c_id}`);

        const onhold = await onholddb.item(ev.resource.id);
        if (!onhold)
          return resp.status(
            200,
            `onhold missing or have been processed: ${c_id}`
          );

        const { sellerReceivableBreakdown: b } = c;
        if (!b || !b.netAmount || !b.paypalFee || !b.receivableAmount) {
          return resp.status(
            201,
            `missing breakdown for capture ${ev.resource.id}`
          );
        }
        const settled = ((
          r
        ): { net: number; fee: number; c: string } | null => {
          const n = b.netAmount?.value;
          const p = b.paypalFee?.value;
          if (!n || !p) return null;
          const c = b.netAmount.currencyCode;
          if (r) {
            return { net: +n * +r, fee: +p * +r, c };
          }
          return { net: +n, fee: +p, c };
        })(b.exchangeRate?.value);

        if (!settled) {
          return resp.status(201, `settled can't be determined: ${c_id}`);
        }

        const final = to_final(onhold, {
          net: settled.net,
          fee: settled.fee,
          in: {
            hash: c_id,
            id: "paypal",
            currency: settled.c,
          },
        });

        const res = await qstash.publishJSON({
          body: final,
          url: `${base_url}/q/final-recorder`,
          retries: 0,
          deduplicationId: final.id,
        });

        console.info(`Final donation record sent:${res.messageId}`);
        return resp.status(200, "processed");
      }
    }
    console.info(ev);
    return resp.status(201, "event type not processed");
  } catch (error) {
    console.error("[paypal webhook] error processing webhook:", error);
    return resp.status(201, "error processing webhook");
  }
};
