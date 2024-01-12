import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, get, useController, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ObjectSchema, number, object } from "yup";
import { FormValues, Props } from "./types";
import { SchemaShape } from "schemas/types";
import { FiatCurrencyData } from "types/aws";
import { useStripeCurrenciesQuery } from "services/apes";
import CurrencySelector, { Currency } from "components/CurrencySelector";
import ExtLink from "components/ExtLink";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import Split from "components/Split";
import { CheckField, Field, Label } from "components/form";
import { requiredString } from "schemas/string";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import AdvancedOptions from "../../../AdvancedOptions";

type FormProps = Props & {
  defaultValues: Partial<FormValues>;
  onSubmit: (formValues: FormValues) => void | Promise<void>;
};

export default function Form(props: FormProps) {
  const queryState = useStripeCurrenciesQuery(null);
  return (
    <QueryLoader
      queryState={queryState}
      classes={{ container: "grid justify-center" }}
    >
      {(data) => <Content {...props} fiatCurrencyData={data} />}
    </QueryLoader>
  );
}

function Content({
  advanceOptDisplay,
  fiatCurrencyData,
  defaultValues,
  state: { recipient },
  widgetConfig,
  onSubmit,
}: FormProps & { fiatCurrencyData: FiatCurrencyData }) {
  const [selectedCurrencyData, setSelectedCurrencyData] = useState(
    fiatCurrencyData.currencies[0]
  );
  const methods = useForm<FormValues>({
    defaultValues: {
      amount: defaultValues.amount,
      currency: { code: selectedCurrencyData.currency_code.toUpperCase() },
      pctLiquidSplit: defaultValues.pctLiquidSplit ?? 50,
      userOptForKYC: recipient.isKYCRequired || defaultValues.userOptForKYC, // if KYC required, user opts in by default
    },
  });
  const { field } = useController({
    control: methods.control,
    name: "currency",
  });

  const isInsideWidget = widgetConfig !== null;

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="grid gap-4">
        <Field<FormValues>
          name="amount"
          label="Donation amount"
          required
          registerOptions={{
            required: "required",
            min: {
              value: selectedCurrencyData.minimum_amount,
              message: `must be greater than ${selectedCurrencyData.minimum_amount}`,
            },
            pattern: {
              value: /[0-9]+/,
              message: "must be a number",
            },
            shouldUnregister: true,
          }}
          tooltip={`The minimum donation amount is 1 USD or ${
            selectedCurrencyData.minimum_amount
          } ${selectedCurrencyData.currency_code.toUpperCase()}`}
        />
        <CurrencySelector
          currencies={fiatCurrencyData.currencies.map((x) => ({
            code: x.currency_code,
          }))}
          disabled={methods.formState.isSubmitting}
          label="Select your donation currency:"
          onChange={(currency) => {
            setSelectedCurrencyData(
              // new currency can be selected only among the passed fiat currency data
              fiatCurrencyData.currencies.find(
                (x) => x.currency_code === currency.code
              )!
            );
            field.onChange(currency);
          }}
          value={field.value}
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
            disabled={methods.formState.isSubmitting}
            className="btn-orange btn-donate w-1/2"
            type="submit"
          >
            <LoadText
              text="Processing..."
              isLoading={methods.formState.isSubmitting}
            >
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
