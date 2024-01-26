import CurrencySelector from "components/CurrencySelector";
import ExtLink from "components/ExtLink";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import Split from "components/Split";
import { CheckField, Field } from "components/form";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import { useState } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { requiredString } from "schemas/string";
import { usePaypalCurrenciesQuery } from "services/apes";
import { useGetter } from "store/accessors";
import { FiatCurrencyData } from "types/aws";
import AdvancedOptions from "../../../AdvancedOptions";
import { FormValues, Props } from "./types";

const USD_CODE = "usd";

type FormProps = Props & {
  defaultValues: Partial<FormValues>;
  onSubmit: (formValues: FormValues) => void | Promise<void>;
};

export default function Form(props: FormProps) {
  const user = useGetter((state) => state.auth.user);
  const queryState = usePaypalCurrenciesQuery(null);
  return (
    <QueryLoader
      queryState={{
        ...queryState,
        isLoading: queryState.isLoading || user === "loading",
      }}
      classes={{ container: "grid justify-center" }}
    >
      {(data) => (
        <Content
          {...props}
          fiatCurrencyData={data}
          authUserEmail={!user || user === "loading" ? "" : user.email}
        />
      )}
    </QueryLoader>
  );
}

function Content({
  advanceOptDisplay,
  authUserEmail,
  fiatCurrencyData,
  defaultValues,
  state: { recipient },
  widgetConfig,
  onSubmit,
}: FormProps & {
  authUserEmail: string;
  fiatCurrencyData: FiatCurrencyData;
}) {
  // store auth. user's email and if the user is in the process of logging out (so that
  // `authUserEmail === ""`), we can use this variable to keep hiding the email field
  // (otherwise the user might get a sudden flash of the email field before being redirected)
  const [originialAuthUserEmail] = useState(authUserEmail);

  const [selectedCurrencyData, setSelectedCurrencyData] = useState(
    getDefaultCurrency(fiatCurrencyData.currencies),
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      amount: defaultValues.amount,
      currency: { code: selectedCurrencyData.currency_code.toUpperCase() },
      email: defaultValues.email ?? originialAuthUserEmail,
      pctLiquidSplit: defaultValues.pctLiquidSplit ?? 50,
      userOptForKYC: recipient.isKYCRequired || defaultValues.userOptForKYC, // if KYC required, user opts in by default
    },
  });
  const { field: currencyField } = useController({
    control: methods.control,
    name: "currency",
  });

  const isInsideWidget = widgetConfig !== null;

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="grid gap-4">
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
                (x) => x.currency_code === currency.code,
              )!,
            );
            currencyField.onChange(currency);
          }}
          value={currencyField.value}
          required
        />
        <Field<FormValues>
          name="amount"
          label="Donation amount"
          required
          // validation must be dynamicly set depending on which exact currency is selected
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
          tooltip={createTooltip(selectedCurrencyData)}
        />
        {!originialAuthUserEmail && (
          <Field<FormValues>
            name="email"
            label="Email"
            required
            registerOptions={{
              required: "required",
              validate: (value) =>
                requiredString.email().isValidSync(value) || "invalid email",
            }}
          />
        )}
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
              Continue
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

function createTooltip({
  currency_code,
  minimum_amount,
}: FiatCurrencyData["currencies"][number]): string {
  return currency_code === USD_CODE
    ? "The minimum donation amount is 1 USD"
    : `The minimum donation amount is 1 USD or ${minimum_amount} ${currency_code.toUpperCase()}`;
}

function getDefaultCurrency(
  currencies: FiatCurrencyData["currencies"],
): FiatCurrencyData["currencies"][number] {
  return currencies.find((x) => x.currency_code === USD_CODE) ?? currencies[0];
}
