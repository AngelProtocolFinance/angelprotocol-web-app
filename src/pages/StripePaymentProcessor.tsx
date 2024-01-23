import { useCallback } from "react";
import { useGetStripePaymentStatusQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import DonateFiatThanks from "./DonateFiatThanks";

export default function StripePaymentProcessor() {
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
      {({ status }) => (
        <DonateFiatThanks
          status={
            status === "succeeded"
              ? "success"
              : status === "processing"
              ? "processing"
              : "failure"
          }
          handleProcessing={handleProcessing}
        />
      )}
    </QueryLoader>
  );
}
