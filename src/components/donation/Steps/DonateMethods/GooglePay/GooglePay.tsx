import GooglePayButton from "@google-pay/button-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema, number, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { FormStep } from "slices/donation";
import { APP_NAME, IS_TEST } from "constants/env";
import DonateField from "./DonateField";

type Props = { state: FormStep };

export default function GooglePay({ state }: Props) {
  const [paymentRequest, setPaymentRequest] = useState(
    createPaymentRequest(state)
  );
  const formRef = useRef<HTMLFormElement>(null);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submit = methods.handleSubmit(({ amount }) =>
    setPaymentRequest((prev) => {
      prev.transactionInfo.totalPrice = amount!.toString(); // since `amount` is required, it must be defined at this point
      return prev;
    })
  );

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        className="flex flex-col gap-5 items-center justify-center min-h-[16rem]"
        onSubmit={submit}
      >
        <p className="text-center">
          Google Pay donations are received by {APP_NAME} and then disbursed to
          the organization the donor chose to support. {APP_NAME} charges 0
          platform fees, however there are third party fees that could be
          accrued
        </p>

        <DonateField />

        <GooglePayButton
          environment={IS_TEST ? "TEST" : "PRODUCTION"}
          buttonType="donate"
          buttonSizeMode="fill"
          paymentRequest={paymentRequest}
          className="w-1/2 h-12"
          onClick={(e) => {
            if (!methods.formState.isValid) {
              e.preventDefault(); // stop default Google Pay behavior
            }
            formRef.current?.requestSubmit(); // trigger form submission to show errors
          }}
        />
      </form>
    </FormProvider>
  );
}

const schema = object<any, SchemaShape<FormValues>>({
  // for making a number field optional using `nullable + transform`,
  // see https://github.com/jquense/yup/issues/500#issuecomment-818582829
  amount: number()
    .required("required")
    .positive("must be greater than zero")
    .typeError("must be a number"),
}) as ObjectSchema<FormValues>;

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
