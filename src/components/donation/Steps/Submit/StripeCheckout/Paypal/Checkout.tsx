import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import ErrorTrigger from "errors/ErrorTrigger";
import { isEmpty } from "helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCapturePayPalOrderMutation } from "services/apes";
import { DonationSource } from "types/lists";

type Props = {
  orderId: string;
  source: DonationSource;
};

type Status = "ready" | "submitting" | { error: unknown };

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout({ orderId, source }: Props) {
  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const [{ isPending }] = usePayPalScriptReducer();
  const [captureOrder] = useCapturePayPalOrderMutation();
  const [status, setStatus] = useState<Status>("ready");

  if (isPending) return <ContentLoader className="rounded h-10 w-40" />;

  //show error UI: https://developer.paypal.com/docs/checkout/standard/customize/handle-errors/#link-buyercheckouterror
  if (typeof status === "object") return <ErrorTrigger error={status.error} />;

  return (
    <PayPalButtons
      style={{
        color: "gold",
        layout: "horizontal",
        shape: "rect",
        label: "paypal",
        height: 40,
      }}
      className="w-40 flex gap-2"
      disabled={status === "submitting"}
      onCancel={() => setStatus("ready")}
      onError={(error) => setStatus({ error })}
      onApprove={async (data, actions) => {
        try {
          const order = await captureOrder({
            orderId: data.orderID,
          }).unwrap();

          if ("debug_id" in order) throw order;

          if (
            "details" in order &&
            order.details[0]?.issue === "INSTRUMENT_DECLINED"
          ) {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          }

          if (
            "purchase_units" in order &&
            isEmpty(order.purchase_units ?? [])
          ) {
            throw order;
          }

          //no problem with order
          const route =
            source === "bg-widget"
              ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_fiat_thanks}`
              : appRoutes.donate_fiat_thanks;
          navigate(route, { state: order.guestDonor });
        } catch (err) {
          handleError(err);
        }
      }}
      createOrder={async () => {
        setStatus("submitting");
        return orderId;
      }}
    />
  );
}
