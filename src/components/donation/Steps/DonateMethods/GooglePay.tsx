import GooglePayButton from "@google-pay/button-react";
import { FormStep } from "slices/donation";
import { IS_TEST } from "constants/env";

type Props = { state: FormStep };

export default function GooglePay({ state }: Props) {
  const paymentRequest = createPaymentRequest(state);

  return (
    <div>
      <GooglePayButton
        environment={IS_TEST ? "TEST" : "PRODUCTION"}
        buttonType="donate"
        buttonSizeMode="fill"
        paymentRequest={paymentRequest}
        onLoadPaymentData={(paymentRequest) => {
          console.log("load payment data", paymentRequest);
        }}
        style={{ width: 240, height: 40 }}
      />
    </div>
  );
}

const createPaymentRequest = (
  state: FormStep
): google.payments.api.PaymentDataRequest => ({
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
          gateway: "example",
          gatewayMerchantId: "exampleGatewayMerchantId",
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: "12345678901234567890",
    merchantName: state.recipient.name,
  },
  transactionInfo: {
    totalPriceStatus: "FINAL",
    totalPriceLabel: "Total",
    totalPrice: "100.00",
    currencyCode: "USD",
    countryCode: "US",
  },
});
