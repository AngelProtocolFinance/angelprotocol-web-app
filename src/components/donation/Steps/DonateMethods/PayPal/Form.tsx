import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues, Props } from "./types";
import { userIsSignedIn } from "types/auth";
import { FiatCurrencyData } from "types/aws";
import { usePaypalCurrenciesQuery } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import CurrencySelector from "components/CurrencySelector";
import ExtLink from "components/ExtLink";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import Split from "components/Split";
import { CheckField, Field } from "components/form";
import { useGetter, useSetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { requiredString } from "schemas/string";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import AdvancedOptions from "../../../AdvancedOptions";

const USD_CODE = "usd";

export default function Form(props: Props) {
  const queryState = usePaypalCurrenciesQuery(null);
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
  recipient,
  widgetConfig,
}: Props & {
  fiatCurrencyData: FiatCurrencyData;
}) {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();
  const authUserEmail = userIsSignedIn(user) ? user.email : "";
  const { handleError } = useErrorContext();

  const [selectedCurrencyData, setSelectedCurrencyData] = useState(
    getDefaultCurrency(fiatCurrencyData.currencies)
  );

  const initial: FormValues = {
    amount: "",
    currency: { code: "USD" },
    email: authUserEmail,
    pctLiquidSplit: 50,
    userOptForKYC: false,
  };

  const methods = useForm<FormValues>({
    defaultValues: initial,
  });
  const { field: currencyField } = useController({
    control: methods.control,
    name: "currency",
  });

  const isInsideWidget = widgetConfig !== null;

  const onSubmit: SubmitHandler<FormValues> = async (fv) => {
    try {
      dispatch(
        setDetails({
          ...fv,
          method: "paypal",
        })
      );
    } catch (err) {
      handleError(err, "Failed to load payment platform");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4">
        <CurrencySelector
          currencies={fiatCurrencyData.currencies.map((x) => ({
            code: x.currency_code,
          }))}
          disabled={methods.formState.isSubmitting}
          label="donation currency:"
          onChange={(currency) => {
            setSelectedCurrencyData(
              // new currency can be selected only among the passed fiat currency data
              fiatCurrencyData.currencies.find(
                (x) => x.currency_code === currency.code
              )!
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
        {!authUserEmail && (
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
  currencies: FiatCurrencyData["currencies"]
): FiatCurrencyData["currencies"][number] {
  return currencies.find((x) => x.currency_code === USD_CODE) ?? currencies[0];
}
