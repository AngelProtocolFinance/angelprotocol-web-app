import { skipToken } from "@reduxjs/toolkit/query";
import QueryLoader from "components/QueryLoader";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import {
  type LoaderFunction,
  Navigate,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { useStripePaymentStatusQuery } from "services/apes";
import type { DonateThanksState } from "types/pages";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  return (
    url.searchParams.get("payment_intent") ??
    url.searchParams.get("setup_intent") ??
    ""
  );
};

export function Component() {
  const isInWidget = useOutletContext<true | undefined>();
  const paymentIntentId = useLoaderData() as string;

  const queryState = useStripePaymentStatusQuery(
    paymentIntentId ? { paymentIntentId } : skipToken
  );

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading donation status",
        error: "Failed to load donation status",
      }}
      classes={{ container: "place-self-center" }}
    >
      {({ guestDonor, recipientName, recipientId }) => {
        const _to = isInWidget
          ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_thanks}`
          : appRoutes.donate_thanks;
        return (
          <Navigate
            to={_to}
            state={
              {
                guestDonor: guestDonor,
                recipientName: recipientName,
                recipientId: recipientId?.toString(),
              } satisfies DonateThanksState
            }
          />
        );
      }}
    </QueryLoader>
  );
}
