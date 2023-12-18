import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetStripePaymentStatusQuery } from "services/apes";
import Icon from "components/Icon";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import { useGetter } from "store/accessors";
import { EMAIL_SUPPORT } from "constants/env";
import { appRoutes } from "constants/routes";

export default function DonateFiatThanks() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const queryState = useGetStripePaymentStatusQuery(
    { clientSecret: clientSecret ?? "" },
    { skip: !clientSecret }
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
      {({ status }) => {
        switch (status) {
          case "succeeded":
            return <Success />;
          case "processing":
            return <Processing onMount={handleProcessing} />;
          case "requires_payment_method":
            return <Unsuccessful />;
          default:
            return <SomethingWentWrong />;
        }
      }}
    </QueryLoader>
  );
}

function Success() {
  return (
    <div className="justify-self-center display-block m-auto max-w-[35rem] py-8 sm:py-20 scroll-mt-6">
      <Icon type="CheckCircle" size={96} className="text-green mb-4 mx-auto" />
      <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
        Thank you for your donation using one of our fiat on-ramp providers!
      </h3>
      <p className="text-center mb-4">
        We'll process your donation to the nonprofit you specified as soon as
        the payment has cleared. You can safely navigate away using the button
        below.
      </p>
      <p className="text-center mb-8">
        If you need a receipt for your donation, please fill out the KYC form
        for this transaction on your{" "}
        <Link to={appRoutes.donations}>My donations</Link> page.
      </p>
      <Link
        to={appRoutes.marketplace}
        className="w-full sm:w-auto btn-orange btn-donate h-10 rounded-lg"
      >
        Back to the platform
      </Link>
    </div>
  );
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
