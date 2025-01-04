import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "@remix-run/react";
import ContentLoader from "components/ContentLoader";
import { type IPromptV2, PromptV2 } from "components/Prompt";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { errorPrompt } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { toWithState } from "helpers/state-params";
import { useState } from "react";
import type { DonateThanksState } from "types/pages";
import { toDonor } from "../../../common/constants";
import type { StripeCheckoutStep } from "../../../types";
import { captureOrder, createOrder } from "./api";

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook

export default function Checkout(props: StripeCheckoutStep) {
  const { details, tip, donor: fvDonor, honorary, init, feeAllowance } = props;

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<IPromptV2>();

  const [{ isPending }] = usePayPalScriptReducer();
  const [state, setState] = useState<"loading" | "error">();

  // const [captureOrder, { isLoading: isCapturingOrder }] =
  //   useCapturePayPalOrderMutation();

  // const [createOrder, { isLoading: isCreatingOrder }] =
  //   usePaypalOrderMutation();

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
      disabled={!!state}
      onError={(error) =>
        setPrompt(errorPrompt(error, { context: "processing payment" }))
      }
      onApprove={async (data, actions) => {
        setState("loading");
        const order = await captureOrder(data.orderID);

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

        navigate(toWithState(route, state));
      }}
      createOrder={async () => {
        setState("loading");
        const id = await createOrder({
          transactionId: init.intentId,
          amount: +details.amount,
          tipAmount: tip?.value ?? 0,
          feeAllowance,
          currency: details.currency.code,
          endowmentId: init.recipient.id,
          splitLiq: 0,
          donor: toDonor(fvDonor),
          source: init.source,
          ...(honorary.honoraryFullName && {
            inHonorOf: honorary.honoraryFullName,
          }),
          ...(details.program.value && {
            programId: details.program.value,
            programName: details.program.label,
          }),
        });
        setState(undefined);
        return id;
      }}
    >
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </PayPalButtons>
  );
}
