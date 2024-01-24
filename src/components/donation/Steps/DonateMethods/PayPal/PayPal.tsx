import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { useState } from "react";
import { FormValues, Props } from "./types";
import { useCreatePayPalOrderMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import KYCForm from "components/KYCForm";
import { KYC } from "slices/donation";
import { PAYPAL_CLIENT_ID } from "constants/env";
import Checkout from "./Checkout";
import Form from "./Form";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: PAYPAL_CLIENT_ID,
  commit: true,
  currency: "USD",
  enableFunding: "paylater",
  disableFunding: "card,venmo",
};

export default function PayPal(props: Props) {
  const [step, setStep] = useState<Step>({ type: "init" });

  const { handleError } = useErrorContext();

  const [createPayPalOrder] = useCreatePayPalOrderMutation();

  switch (step.type) {
    case "init":
      const { type, ...defaultValues } = step;
      return (
        <Form
          {...props}
          defaultValues={defaultValues}
          onSubmit={async (fv) => {
            if (fv.userOptForKYC) {
              return setStep({ ...step, type: "kyc", ...fv });
            }
            try {
              const { orderId } = await createPayPalOrder({
                amount: +fv.amount,
                currency: fv.currency.code,
                endowmentId: props.state.recipient.id,
                email: fv.email,
                splitLiq: fv.pctLiquidSplit.toString(),
              }).unwrap();
              setStep({ ...step, type: "checkout", orderId, ...fv });
            } catch (err) {
              handleError(err, "Failed to load payment platform");
            }
          }}
        />
      );
    case "kyc":
      return (
        <KYCForm
          type="on-donation"
          classes="grid gap-5 sm:grid-cols-2"
          defaultValues={{
            ...(step.kycData ?? {}),
            kycEmail: step.kycData?.kycEmail ?? step.email,
          }}
          recipient={props.state.recipient}
          onBack={() => setStep({ ...step, type: "init" })}
          onSubmit={async (kyc) => {
            try {
              const { orderId } = await createPayPalOrder({
                amount: +step.amount,
                currency: step.currency.code,
                email: step.email,
                endowmentId: props.state.recipient.id,
                splitLiq: step.pctLiquidSplit.toString(),
                kycData: {
                  city: kyc.city,
                  country: kyc.country.name,
                  fullName: `${kyc.name.first} ${kyc.name.last}`,
                  kycEmail: kyc.kycEmail,
                  streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
                  state: kyc.usState.value || kyc.state,
                  zipCode: kyc.postalCode,
                },
              }).unwrap();
              setStep({
                ...step,
                type: "checkout",
                orderId,
                kycData: kyc,
              });
            } catch (err) {
              handleError(err, "Failed to load payment platform");
            }
          }}
        />
      );
    default:
      return (
        <PayPalScriptProvider options={initialOptions}>
          <Checkout
            orderId={step.orderId}
            onBack={() => {
              // check whether KYC step was performed
              if (step.userOptForKYC) {
                setStep({ ...step, type: "kyc" });
              } else {
                setStep({ ...step, type: "init" });
              }
            }}
          />
        </PayPalScriptProvider>
      );
  }
}

type InitStep = {
  type: "init";
  kycData?: KYC;
} & Partial<FormValues>;

type KYCStep = {
  type: "kyc";
  kycData?: KYC;
} & FormValues;

type CheckoutStep = {
  type: "checkout";
  orderId: string;
} & Omit<KYCStep, "type">;

type Step = InitStep | KYCStep | CheckoutStep;
