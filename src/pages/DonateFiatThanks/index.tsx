import { Link } from "react-router-dom";
import { useGetStripePaymentIntentQuery } from "services/apes";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { appRoutes } from "constants/routes";

export default function DonateFiatThanks() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const queryState = useGetStripePaymentIntentQuery(
    { clientSecret: clientSecret ?? "" },
    { skip: !clientSecret }
  );

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading payment details",
        error: "Failed to load payment details",
      }}
    >
      {(paymentIntent) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            return (
              <div className="justify-self-center display-block m-auto max-w-[35rem] py-8 sm:py-20 scroll-mt-6">
                <Icon
                  type="CheckCircle"
                  size={96}
                  className="text-green mb-4 mx-auto"
                />
                <h3 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center">
                  Thank you for your donation using one of our fiat on-ramp
                  providers!
                </h3>
                <p className="text-center mb-4">
                  We'll process your donation to the nonprofit you specified as
                  soon as the payment has cleared. You can safely navigate away
                  using the button below.
                </p>
                <p className="text-center mb-8">
                  If you need a receipt for your donation, please fill out the
                  KYC form for this transaction on your{" "}
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
          case "processing":
            return <div>Your payment is processing.</div>;
          case "requires_payment_method":
            return (
              <div>Your payment was not successful, please try again.</div>
            );
          default:
            return <div>Something went wrong.</div>;
        }
      }}
    </QueryLoader>
  );
}
