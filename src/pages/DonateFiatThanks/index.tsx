import StripeThanks from "./StripeThanks";

export default function DonateFiatThanks() {
  const paymentIntentId = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );

  if (paymentIntentId) {
    return <StripeThanks paymentIntentId={paymentIntentId} />;
  }

  return <></>;
}
