import type { DonationIntent } from "@better-giving/donation/intent";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { useNavigate } from "react-router-dom";
import {
  useCapturePayPalOrderMutation,
  usePaypalOrderMutation,
} from "services/apes";
import type { DonateThanksState } from "types/pages";
import { toDonor } from "../../../common/constants";
import type { StripeCheckoutStep } from "../../../types";

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout(props: StripeCheckoutStep) {
  const { details, tip, donor: fvDonor, honorary, init, feeAllowance } = props;

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

        const state: DonateThanksState = {
          guestDonor: order.guestDonor,
          recipientName: init.recipient.name,
        };

        const route =
          props.init.source === "bg-widget"
            ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_thanks}`
            : appRoutes.donate_thanks;

        navigate(route, { state });
      }}
      createOrder={async () => {
        const intent: DonationIntent = {
          amount: {
            amount: +details.amount,
            tip: tip?.value ?? 0,
            feeAllowance,
            currency: details.currency.code,
          },
          frequency: "one-time",
          recipient: init.recipient.id,
          donor: toDonor(fvDonor),
          viaId: "paypal",
          viaName: "Paypal",
          source: init.source,
        };
        if (honorary.honoraryFullName) {
          intent.tribute = {
            fullName: honorary.honoraryFullName,
          };
          if (honorary.withTributeNotif) {
            intent.tribute.notif = honorary.tributeNotif;
          }
        }

        if (details.program.value) {
          intent.program = {
            id: details.program.value,
            name: details.program.label,
          };
        }

        const res = await createOrder(intent).unwrap();
        return res;
      }}
    />
  );
}
