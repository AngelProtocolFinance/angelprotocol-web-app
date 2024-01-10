import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ObjectSchema, number, object } from "yup";
import { FormValues, Props } from "./types";
import { SchemaShape } from "schemas/types";
import { FiatCurrencyData } from "types/aws";
import { useStripeCurrenciesQuery } from "services/apes";
import { Currency } from "components/CurrencySelector";
import ExtLink from "components/ExtLink";
import LoadText from "components/LoadText";
import QueryLoader from "components/QueryLoader";
import Split from "components/Split";
import { CheckField, Field } from "components/form";
import { requiredString } from "schemas/string";
import { appRoutes } from "constants/routes";
import { TERMS_OF_USE_DONOR } from "constants/urls";
import AdvancedOptions from "../../../AdvancedOptions";
import CurrencySelectorField from "./CurrencySelectorField";

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
      {(data) => <Content {...props} currencies={data.currencies} />}
    </QueryLoader>
  );
}

function Content({
  advanceOptDisplay,
  currencies,
  defaultValues,
  state: { recipient },
  widgetConfig,
  onSubmit,
}: FormProps & FiatCurrencyData) {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: defaultValues.amount,
      currency: { code: currencies[0].currency_code.toUpperCase() },
      pctLiquidSplit: defaultValues.pctLiquidSplit ?? 50,
      userOptForKYC: recipient.isKYCRequired || defaultValues.userOptForKYC, // if KYC required, user opts in by default
    },
  });

  const isInsideWidget = widgetConfig !== null;

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit} className="grid gap-4">
        <Field<FormValues>
          name="amount"
          label="Donation amount"
          classes={{ label: "font-bold" }}
        />
        <CurrencySelectorField<FormValues>
          name="currency"
          currencies={currencies.map((x) => x.currency_code)}
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

const schema = object<any, SchemaShape<FormValues>>({
  // for making a number field optional using `nullable + transform`,
  // see https://github.com/jquense/yup/issues/500#issuecomment-818582829
  amount: number()
    .required("required")
    .positive("must be greater than zero")
    .typeError("must be a number"),
  currency: object<any, SchemaShape<Currency>>({
    code: requiredString.length(3),
  }),
}) as ObjectSchema<FormValues>;
