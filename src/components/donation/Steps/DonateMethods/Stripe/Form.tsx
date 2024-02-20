import { yupResolver } from "@hookform/resolvers/yup";
import CurrencySelector from "components/CurrencySelector";
import { Field } from "components/form";
import { FormProvider, useController, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { useStripeCurrenciesQuery } from "services/apes";
import { setDetails } from "slices/donation";
import { useSetter } from "store/accessors";
import { Currency } from "types/components";
import { FormValues as FV, Props } from "./types";

const USD_CODE = "usd";

export default function Form({ widgetConfig, details }: Props) {
  const dispatch = useSetter();

  const currencies = useStripeCurrenciesQuery(null);

  const initial: FV = {
    source: widgetConfig ? "bg-widget" : "bg-marketplace",
    amount: "",
    currency: { code: USD_CODE, min: 1, rate: 1 },
  };

  const currencyKey: keyof FV = "currency";
  const methods = useForm<FV>({
    defaultValues: details || initial,
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("required"),
          (n) =>
            n
              .positive("must be greater than 0")
              .when(currencyKey, (values, schema) => {
                const [currency] = values as [Currency | undefined];
                return currency?.min
                  ? schema.min(currency.min, "less than min")
                  : schema;
              })
        ),
      })
    ),
  });
  const { control, handleSubmit } = methods;

  const {
    field: { value: currency, onChange: onCurrencyChange },
  } = useController<FV, "currency">({
    control: control,
    name: "currency",
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((fv) =>
          dispatch(
            setDetails({
              ...fv,
              method: "stripe",
            })
          )
        )}
        className="grid gap-4"
      >
        <CurrencySelector
          currencies={currencies}
          label="Currency"
          onChange={onCurrencyChange}
          value={currency}
          classes={{ label: "font-semibold" }}
          required
        />
        <Field<FV>
          name="amount"
          label="Donation amount"
          classes={{ label: "font-semibold" }}
          required
          // validation must be dynamicly set depending on which exact currency is selected
          tooltip={createTooltip(currency)}
        />

        <p className="text-sm text-gray-d2 dark:text-gray mt-4">
          Please click the button below and follow the instructions provided to
          complete your donation
        </p>

        <button className="btn-orange btn-donate mt-2" type="submit">
          Continue
        </button>
      </form>
    </FormProvider>
  );
}

function createTooltip({ code, min }: Currency): string | undefined {
  if (!min) return undefined;
  return code === USD_CODE
    ? "The minimum donation amount is 1 USD"
    : `The minimum donation amount is 1 USD or ${min} ${code.toUpperCase()}`;
}
