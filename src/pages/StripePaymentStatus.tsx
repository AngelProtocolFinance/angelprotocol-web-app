import { PaymentIntent } from "@stripe/stripe-js";
import { useCallback, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useGetStripePaymentStatusQuery } from "services/apes";
import Icon from "components/Icon";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import { useGetter } from "store/accessors";
import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";

export default function StripePaymentStatus() {
  const paymentIntentId = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );

  const queryState = useGetStripePaymentStatusQuery(
    {
      paymentIntentId: paymentIntentId ?? "",
    },
    { skip: !paymentIntentId }
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
      {({ status }) => <Content status={status} onMount={handleProcessing} />}
    </QueryLoader>
  );
}

function Content(props: { status: PaymentIntent.Status; onMount: () => void }) {
  switch (props.status) {
    case "succeeded":
      return <Navigate to={appRoutes.donate_fiat_thanks} />;
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
    <div className="justify-self-center display-block m-auto max-w-[35rem] py-8 sm:py-20 scroll-mt-6">
      <Icon type="CloseCircle" size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Donation unsuccessful
      </h3>
      <p className="text-center mb-8">
        Your donation was not successful, please try again.
      </p>
      <Link
        to={`${appRoutes.donate}/${state.recipient?.id}`}
        className="w-full sm:w-auto btn-orange btn-donate h-10 rounded-lg"
      >
        Back to the donation page
      </Link>
    </div>
  );
}

function SomethingWentWrong() {
  const state = useGetter((state) => state.donation);
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] py-8 sm:py-20 scroll-mt-6">
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
        className="w-full sm:w-auto btn-orange btn-donate h-10 rounded-lg"
      >
        Back to the donation page
      </Link>
    </div>
  );
}
