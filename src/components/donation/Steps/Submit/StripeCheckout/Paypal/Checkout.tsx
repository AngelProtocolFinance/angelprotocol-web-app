import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
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

  return (
    <>
      {isPending && <ContentLoader className="rounded h-10 w-40" />}
      {!isPending && (
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
          onError={(error) => {
            handleError(error, GENERIC_ERROR_MESSAGE);
          }}
          onApprove={async (data, actions) => {
            const order = await captureOrder({
              orderId: data.orderID,
            }).unwrap();

            if ("details" in order) {
              if (order.details[0]?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if ("debug_id" in order) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${order.details[0]?.description} (${order.debug_id})`
                );
              }
            } else if (isEmpty(order.purchase_units ?? [])) {
              throw new Error(JSON.stringify(order));
            } else {
              //accessed by redirect page
              const state: DonateFiatThanksState = {
                guestDonor: order.guestDonor,
                recipientName: recipient.name,
              };
              if (details.source === "bg-widget") {
                navigate(
                  `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_fiat_thanks}`,
                  { state }
                );
              } else {
                navigate(appRoutes.donate_fiat_thanks, { state });
              }
            }
          }}
          createOrder={async () => {
            const orderId = await createOrder({
              amount: +details.amount,
              tipAmount: tip,
              usdRate: details.currency.rate,
              currency: details.currency.code,
              endowmentId: recipient.id,
              splitLiq: liquidSplitPct,
              donor,
              source: details.source,
            }).unwrap();
            return orderId;
          }}
        />
      )}
    </>
  );
}
