import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ObjectSchema, number, object } from "yup";
import { Props } from "./types";
import { SchemaShape } from "schemas/types";
import { useCreateStripePaymentIntentMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import ExtLink from "components/ExtLink";
import LoadText from "components/LoadText";
import Split from "components/Split";
import { CheckField, Field } from "components/form";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import AdvancedOptions from "../../../AdvancedOptions";

type FormValues = {
  amount: number;
  pctLiquidSplit: number;
  userOptForKYC: boolean;
};

type FormProps = Props & {
  onSubmit: (clientSecret: string, userOptForKYC: boolean) => void;
};

export default function Form({
  advanceOptDisplay,
  onSubmit,
  widgetConfig,
  state: { recipient },
}: FormProps) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      pctLiquidSplit: 50,
      userOptForKYC: recipient.isKYCRequired, // if KYC required, user opts in by default
    },
  });
  const { handleError } = useErrorContext();
  const [createPaymentIntent, { isLoading }] =
    useCreateStripePaymentIntentMutation();

  const isInsideWidget = widgetConfig !== null;

  const submit = methods.handleSubmit(async (fv) => {
    try {
      const { clientSecret } = await createPaymentIntent({
        amount: fv.amount,
        endowmentId: recipient.id,
        liquidSplitPct: fv.pctLiquidSplit.toString(),
      }).unwrap();
      onSubmit(clientSecret, fv.userOptForKYC);
    } catch (err) {
      handleError(err, "Failed to load payment platform");
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="grid gap-4">
        <Field<FormValues>
          name="amount"
          label="Donation amount (USD)"
          classes={{ label: "font-bold" }}
        />
        {!recipient.isKYCRequired && (
          // if KYC is required, the checkbox is redundant
          <CheckField<FormValues>
            name="userOptForKYC"
            classes={{
              container: "text-sm",
              error: "mt-2",
            }}
          >
            Please send me a tax receipt
          </CheckField>
        )}
        <AdvancedOptions
          display={advanceOptDisplay}
          splitComponent={
            <Split<FormValues, "pctLiquidSplit">
              className="mb-6"
              liqPctField="pctLiquidSplit"
            />
          }
        />
        <p className="text-sm text-gray-d2 dark:text-gray mt-4">
          Please click the button below and follow the instructions provided to
          complete your donation
        </p>

        <div
          className={`flex gap-3 md:gap-5 ${
            isInsideWidget ? "justify-center" : "justify-between"
          } font-body mt-4`}
        >
          {!isInsideWidget && (
            <Link
              className="btn-outline-filled btn-donate w-1/2"
              to={`${appRoutes.marketplace}/${recipient.id}`}
            >
              back
            </Link>
          )}
          <button
            disabled={isLoading}
            className="btn-orange btn-donate w-1/2"
            type="submit"
          >
            <LoadText text="Processing..." isLoading={isLoading}>
              Pay with card
            </LoadText>
          </button>
        </div>
        <p className="text-sm italic text-gray-d2 dark:text-gray mt-4">
          By making a donation, you agree to our{" "}
          <ExtLink
            className="underline text-orange hover:text-orange-l2"
            href={TERMS_OF_USE_DONOR}
          >
            Terms & Conditions
          </ExtLink>
        </p>
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
