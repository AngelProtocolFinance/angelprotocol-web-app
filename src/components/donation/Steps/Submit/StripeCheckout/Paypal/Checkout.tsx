import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { DonateFiatThanksState } from "pages/DonateFiatThanks";
import { useNavigate } from "react-router-dom";
import {
  useCapturePayPalOrderMutation,
  usePaypalOrderMutation,
} from "services/apes";
import { StripeCheckoutStep } from "slices/donation";

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout(props: StripeCheckoutStep) {
  const { details, recipient, liquidSplitPct, tip = 0, donor } = props;

  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const [{ isPending }] = usePayPalScriptReducer();

  const [captureOrder, { isLoading: isCapturingOrder }] =
    useCapturePayPalOrderMutation();

  const [createOrder, { isLoading: isCreatingOrder }] =
    usePaypalOrderMutation();

  if (isPending) return <ContentLoader className="rounded h-10 w-40" />;

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
      disabled={isCapturingOrder || isCreatingOrder}
      onError={(error) => handleError(error, { context: "processing payment" })}
      onApprove={async (data, actions) => {
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

        if ("purchase_units" in order && isEmpty(order.purchase_units ?? [])) {
          throw order;
        }

        /// No problem with order

        const state: DonateFiatThanksState = {
          guestDonor: order.guestDonor,
          recipientName: recipient.name,
        };

        const route =
          details.source === "bg-widget"
            ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_fiat_thanks}`
            : appRoutes.donate_fiat_thanks;

        navigate(route, { state });
      }}
      createOrder={async () =>
        await createOrder({
          amount: +details.amount,
          tipAmount: tip,
          currency: details.currency.code,
          endowmentId: recipient.id,
          splitLiq: liquidSplitPct,
          donor,
          source: details.source,
        }).unwrap()
      }
    />
  );
}
