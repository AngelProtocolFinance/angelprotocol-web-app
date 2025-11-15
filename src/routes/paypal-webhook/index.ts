import { base_url, resp } from "helpers/https";
import type { ActionFunction } from "react-router";
import { handler_order } from "./handle-order";
import { verified_body } from "./helpers";
import type { TWebhookEvent } from "./types";
import { dondb, onholddb } from ".server/aws/db";
import { paypal_orders } from ".server/sdks";
import { is_resp } from ".server/utils";

export const action: ActionFunction = async ({ request }) => {
  try {
    const jsonstr = await verified_body(request);
    if (is_resp(jsonstr)) return jsonstr;

    const ev: TWebhookEvent = JSON.parse(jsonstr);

    console.info("[paypal webhook] received:", ev);

    switch (ev.event_type) {
      case "CHECKOUT.ORDER.APPROVED": {
        const { result: order } = await paypal_orders.getOrder({
          id: ev.resource.id,
        });
        return await handler_order(order, base_url(request));
      }
      case "PAYMENT.CAPTURE.COMPLETED": {
        const order_id = ev.resource.supplementary_data.related_ids.order_id;
        const [x, y] = await Promise.all([
          dondb.item(order_id),
          onholddb.item(order_id),
        ]);

        if (x || y) {
          return resp.status(201, "order is already processed");
        }

        const { result: order } = await paypal_orders.getOrder({
          id: order_id,
        });
        return await handler_order(order, base_url(request));
      }
    }
    console.info(ev);
    return resp.status(201, "event type not processed");
  } catch (error) {
    console.error("[paypal webhook] error processing webhook:", error);
    return resp.status(201, "error processing webhook");
  }
};
