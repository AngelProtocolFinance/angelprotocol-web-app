import type { components as oc } from "@better-giving/paypal/orders";
import type { components as pc } from "@better-giving/paypal/payments";
import type { components as wc } from "@better-giving/paypal/webhooks";
import { resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { to_final } from "routes/helpers/donation";
import { verified_body } from "./helpers";
import { onholddb } from ".server/aws/db";
import { qstash } from ".server/sdks";
import { is_resp } from ".server/utils";

export const action: ActionFunction = async ({ request }) => {
  try {
    const base_url = new URL(request.url).origin;
    const jsonstr = await verified_body(request);
    if (is_resp(jsonstr)) return jsonstr;

    const ev: wc["schemas"]["event"] = JSON.parse(jsonstr);

    console.info("[paypal webhook] received:", ev);

    switch (ev.event_type) {
      case "CHECKOUT.ORDER.APPROVED": {
        const {
          id: order_id,
          payment_source,
          purchase_units,
        } = ev.resource as oc["schemas"]["order"];

        if (!order_id) return resp.status(201, "missing order id");

        const ps = payment_source?.venmo || payment_source?.paypal;

        /** we only expect paypal and venmo */
        if (!ps) return resp.status(201, "paypal and venmo not found");

        const {
          email_address: email,
          address: {
            address_line_1: l1,
            address_line_2: l2,
            admin_area_1: state,
            admin_area_2: city,
            postal_code: zip,
            country_code: country,
          } = {},
          name: n,
        } = ps;

        if (!email) {
          return resp.status(201, `missing email for order: ${order_id}`);
        }

        const onhold_id = purchase_units?.[0]?.custom_id;
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
        const fn = [n?.given_name, n?.surname].filter(Boolean).join(" ") || "";
        const str = [l1, l2].filter(Boolean).join(" ") || "";
        //update donor info
        const res = await onholddb.update(onhold_id, {
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
        const {
          id: cid,
          custom_id: onhold_id,
          seller_receivable_breakdown: b,
        } = ev.resource as pc["schemas"]["capture-2"];
        if (!cid) return resp.status(201, "missing capture id");

        if (!onhold_id)
          return resp.status(201, `missing onhold id for capture: ${cid}`);

        const onhold = await onholddb.item(onhold_id);
        if (!onhold)
          return resp.status(
            200,
            `onhold missing or have been processed: ${cid}`
          );

        if (!b || !b.net_amount || !b.paypal_fee) {
          return resp.status(201, `missing breakdown for capture ${cid}`);
        }
        const settled = ((
          r
        ): { net: number; fee: number; c: string } | null => {
          const n = b.net_amount?.value;
          const p = b.paypal_fee?.value;
          if (!n || !p) return null;
          const c = b.net_amount.currency_code;
          if (r) {
            return { net: +n * +r, fee: +p * +r, c };
          }
          return { net: +n, fee: +p, c };
        })(b.exchange_rate?.value);

        if (!settled) {
          return resp.status(201, `settled can't be determined: ${cid}`);
        }

        const final = to_final(onhold, {
          net: settled.net,
          fee: settled.fee,
          in: { hash: cid, id: "paypal", currency: settled.c },
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
