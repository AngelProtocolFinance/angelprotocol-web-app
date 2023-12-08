import { FormStep } from "slices/donation";
import { GOOGLE_PAY_MERCHANT_ID, PUBLIC_STRIPE_KEY } from "constants/env";
import getProfileUrl from "../getProfileUrl";

export default function createPaymentRequest(
  state: FormStep
): google.payments.api.PaymentDataRequest {
  const profileUrl = getProfileUrl(state.recipient.id);
  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "stripe",
            "stripe:version": "2018-10-31",
            "stripe:publishableKey": PUBLIC_STRIPE_KEY,
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: GOOGLE_PAY_MERCHANT_ID,
      merchantName: `${state.recipient.name} (${profileUrl})`,
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US",
    },
  };
}
