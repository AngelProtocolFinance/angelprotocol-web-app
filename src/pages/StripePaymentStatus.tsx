import { skipToken } from "@reduxjs/toolkit/query";
import type { PaymentIntent } from "@stripe/stripe-js";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { toWithState } from "helpers/state-params";
import { CircleX } from "lucide-react";
import { useCallback, useEffect } from "react";
import {
  Link,
  type LoaderFunction,
  Navigate,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { useStripePaymentStatusQuery } from "services/apes";
import type { GuestDonor } from "types/aws";
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

  const { refetch } = queryState;

  const handleProcessing = useCallback(() => refetch(), [refetch]);

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading donation status",
        error: "Failed to load donation status",
      }}
      classes={{ container: "place-self-center" }}
    >
      {({
        status,
        guestDonor,
        recipientName,
        recipientId,
        arrivalDate,
        url,
      }) => (
        <>
          {/** override default scripts when used inside iframe */}
          <Seo scripts={isInWidget ? [] : undefined} />
          <Content
            status={status}
            onMount={handleProcessing}
            isInWidget={isInWidget ?? false}
            guestDonor={guestDonor}
            recipientName={recipientName}
            recipientId={recipientId}
            bankVerificationUrl={url}
            microdepositArrivalDate={arrivalDate}
          />
        </>
      )}
    </QueryLoader>
  );
}

function Content(props: {
  status: PaymentIntent.Status;
  onMount: () => void;
  isInWidget: boolean;
  guestDonor?: GuestDonor;
  recipientName?: string;
  recipientId?: number;
  bankVerificationUrl?: string;
  microdepositArrivalDate?: number;
}) {
  switch (props.status) {
    case "succeeded":
      const to = props.isInWidget
        ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_thanks}`
        : appRoutes.donate_thanks;
      return (
        <Navigate
          to={toWithState(to, {
            guestDonor: props.guestDonor,
            recipientName: props.recipientName,
            recipientId: props.recipientId,
          } satisfies DonateThanksState)}
        />
      );
    case "processing":
      return <Processing onMount={props.onMount} />;
    case "requires_action":
      const _to = props.isInWidget
        ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_thanks}`
        : appRoutes.donate_thanks;
      return (
        <Navigate
          to={toWithState(_to, {
            guestDonor: props.guestDonor,
            recipientName: props.recipientName,
            recipientId: props.recipientId,
            bankVerificationUrl: props.bankVerificationUrl,
            microdepositArrivalDate: props.microdepositArrivalDate,
          } satisfies DonateThanksState)}
        />
      );
    case "canceled":
      return <Unsuccessful recipientId={props.recipientId} />;
    default:
      return <SomethingWentWrong recipientId={props.recipientId} />;
  }
}
function Processing({ onMount = () => {} }) {
  useEffect(() => onMount(), [onMount]);
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] h-full scroll-mt-6 grid place-items-center text-lg sm:text-xl">
      <LoadText
        isLoading
        text="Your donation is still processing, please wait..."
      />
    </div>
  );
}

function Unsuccessful({ recipientId }: { recipientId?: number }) {
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] pt-8 sm:pt-20 pb-20 scroll-mt-6">
      <CircleX size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Donation unsuccessful
      </h3>
      <p className="text-center mb-8">
        Your donation was not successful, please try again.
      </p>
      <Link
        to={`${appRoutes.donate}/${recipientId}`}
        className="w-full sm:w-auto btn-blue btn-donate h-10 rounded-lg"
      >
        Back to the donation page
      </Link>
    </div>
  );
}

function SomethingWentWrong({ recipientId }: { recipientId?: number }) {
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] pt-8 sm:pt-20 pb-20 scroll-mt-6">
      <CircleX size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Something went wrong
      </h3>
      <p className="text-center mb-8">
        An error occurred. Please retry your donation. If the problem persists,
        please get in touch with {EMAIL_SUPPORT}.
      </p>
      <Link
        to={`${appRoutes.donate}/${recipientId}`}
        className="w-full sm:w-auto btn-blue btn-donate h-10 rounded-lg"
      >
        Back to the donation page
      </Link>
    </div>
  );
}
