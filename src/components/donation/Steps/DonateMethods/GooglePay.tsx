import GooglePayButton from "@google-pay/button-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema, number, object } from "yup";
import { SchemaShape } from "schemas/types";
import { Field } from "components/form";
import { FormStep } from "slices/donation";
import { IS_TEST } from "constants/env";

type Props = { state: FormStep };

export default function GooglePay({ state }: Props) {
  const [paymentRequest, setPaymentRequest] = useState(
    createPaymentRequest(state)
  );
  const formRef = useRef<HTMLFormElement>(null);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        className="flex flex-col gap-5 items-center justify-center min-h-[16rem]"
        onSubmit={methods.handleSubmit(({ amount }) =>
          setPaymentRequest((prev) => {
            prev.transactionInfo.totalPrice = amount.toString();
            return prev;
          })
        )}
      >
        <Field<FormValues>
          name="amount"
          label="Donation amount (USD)"
          classes={{ label: "font-bold", container: "w-96" }}
        />
        <GooglePayButton
          environment={IS_TEST ? "TEST" : "PRODUCTION"}
          buttonType="donate"
          buttonSizeMode="fill"
          paymentRequest={paymentRequest}
          style={{ width: 240, height: 40 }}
          onClick={(e) => {
            if (!methods.formState.isValid) {
              e.preventDefault();
            }
            formRef.current?.requestSubmit();
          }}
        />
      </form>
    </FormProvider>
  );
}

type FormValues = { amount: number };

const schema = object<any, SchemaShape<FormValues>>({
  // for making a number field optional using `nullable + transform`,
  // see https://github.com/jquense/yup/issues/500#issuecomment-818582829
  amount: number()
    .required("required")
    .positive("must be greater than zero")
    .typeError("must be a number")
    .transform((cur, orig) => (orig === "" ? undefined : cur)),
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
