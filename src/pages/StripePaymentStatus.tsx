import type { LoaderFunction } from "@remix-run/node";
import { Navigate, useLoaderData, useOutletContext } from "@remix-run/react";
import type { PaymentIntent } from "@stripe/stripe-js";
import { apes } from "api/api";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import type { GuestDonor } from "types/aws";
import type { DonateThanksState } from "types/pages";

interface StripeRequiresBankVerification {
  /** timestamp in seconds: only present when status ===  "requires_action"*/
  arrivalDate?: number;
  url?: string;
}
interface LoaderData
  extends Pick<PaymentIntent, "status">,
    StripeRequiresBankVerification {
  guestDonor?: GuestDonor;
  recipientName?: string;
  recipientId?: number;
}

export const clientLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const id =
    url.searchParams.get("payment_intent") ??
    url.searchParams.get("setup_intent");

  return apes.get(`stripe-proxy?payment_intent=${id}`).json();
};

export default function StripePaymentStatus() {
  const isInWidget = useOutletContext<true | undefined>();
  const data = useLoaderData() as LoaderData;
  const to = isInWidget
    ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_thanks}`
    : appRoutes.donate_thanks;
  return (
    <Navigate
      to={toWithState(to, {
        guestDonor: data.guestDonor,
        recipientName: data.recipientName,
        recipientId: data.recipientId?.toString(),
      } satisfies DonateThanksState)}
    />
  );
}
