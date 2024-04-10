import { PaymentIntent } from "@stripe/stripe-js";
import Icon from "components/Icon";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useCallback, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useGetStripePaymentStatusQuery } from "services/apes";
import { useGetter } from "store/accessors";
import { GuestDonor } from "types/aws";
import { DonateFiatThanksState } from "./DonateFiatThanks";

export default function StripePaymentStatus() {
  const paymentIntentId =
    new URLSearchParams(window.location.search).get("payment_intent") ?? "";

  const queryState = useGetStripePaymentStatusQuery(
    { paymentIntentId },
    { skip: !paymentIntentId }
  );

  const { refetch } = queryState;

  const handleProcessing = useCallback(() => refetch(), [refetch]);

  const isInWidget = window.location.pathname.includes(appRoutes.donate_widget);

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading donation status",
        error: "Failed to load donation status",
      }}
      classes={{ container: "place-self-center" }}
    >
      {({ status, guestDonor, recipientName }) => (
        <Content
          status={status}
          onMount={handleProcessing}
          isInWidget={isInWidget}
          guestDonor={guestDonor}
          recipientName={recipientName}
        />
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
}) {
  switch (props.status) {
    case "succeeded":
      const to = props.isInWidget
        ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_fiat_thanks}`
        : appRoutes.donate_fiat_thanks;
      return (
        <Navigate
          to={to}
          state={
            {
              guestDonor: props.guestDonor,
              recipientName: props.recipientName,
            } satisfies DonateFiatThanksState
          }
        />
      );
    case "processing":
      return <Processing onMount={props.onMount} />;
    case "canceled":
      return <Unsuccessful />;
    default:
      return <SomethingWentWrong />;
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

function Unsuccessful() {
  const state = useGetter((state) => state.donation);
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] pt-8 sm:pt-20 pb-20 scroll-mt-6">
      <Icon type="CloseCircle" size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Donation unsuccessful
      </h3>
      <p className="text-center mb-8">
        Your donation was not successful, please try again.
      </p>
      <Link
        to={`${appRoutes.donate}/${state.recipient?.id}`}
        className="w-full sm:w-auto btn-blue btn-donate h-10 rounded-lg"
      >
        Back to the donation page
      </Link>
    </div>
  );
}

function SomethingWentWrong() {
  const state = useGetter((state) => state.donation);
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] pt-8 sm:pt-20 pb-20 scroll-mt-6">
      <Icon type="CloseCircle" size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Something went wrong
      </h3>
      <p className="text-center mb-8">
        An error occurred. Please retry your donation. If the problem persists,
        please get in touch with {EMAIL_SUPPORT}.
      </p>
      <Link
        to={`${appRoutes.donate}/${state.recipient?.id}`}
        className="w-full sm:w-auto btn-blue btn-donate h-10 rounded-lg"
      >
        Back to the donation page
      </Link>
    </div>
  );
}
