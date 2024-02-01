import CurrencySelector from "components/CurrencySelector";
import LoadText from "components/LoadText";
import { CheckField, Field } from "components/form";
import { FormProvider, useController, useForm } from "react-hook-form";
import { requiredString } from "schemas/string";
import { usePaypalCurrenciesQuery } from "services/apes";
import { setDetails } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { Currency } from "types/components";
import { FormValues, Props } from "./types";

const USD_CODE = "usd";

export default function Form({ recipient, details, widgetConfig }: Props) {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();
  const authUserEmail = userIsSignedIn(user) ? user.email : "";

  const currencies = usePaypalCurrenciesQuery(null);

  const initial: FormValues = {
    source: widgetConfig ? "bg-widget" : "bg-marketplace",
    amount: "",
    currency: { code: USD_CODE, min: 1 },
    email: authUserEmail,
    userOptForKYC: false,
  };

  const methods = useForm<FormValues>({
    defaultValues: details || initial,
  });
  const {
    field: { value: currency, onChange: onCurrencyChange },
  } = useController({
    control: methods.control,
    name: "currency",
  });

  const isInsideWidget = widgetConfig !== null;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((fv) => {
          dispatch(
            setDetails({
              ...fv,
              method: "paypal",
            })
          );
        })}
        className="grid gap-4"
      >
        <CurrencySelector
          currencies={currencies}
          disabled={methods.formState.isSubmitting}
          classes={{ label: "font-semibold" }}
          label="Currency"
          onChange={onCurrencyChange}
          value={currency}
          required
        />
        <Field<FormValues>
          name="amount"
          label="Donation amount"
          classes={{ label: "font-semibold" }}
          required
          // validation must be dynamicly set depending on which exact currency is selected
          registerOptions={{
            required: "required",
            min: currency.min
              ? {
                  value: currency.min,
                  message: `must be greater than ${currency.min}`,
                }
              : undefined,
            pattern: {
              value: /[0-9]+/,
              message: "must be a number",
            },
            shouldUnregister: true,
          }}
          tooltip={createTooltip(currency)}
        />
        {!authUserEmail && (
          <Field<FormValues>
            name="email"
            label="Email"
            classes={{ label: "font-semibold" }}
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
        <p className="text-sm text-gray-d2 dark:text-gray mt-4">
          Please click the button below and follow the instructions provided to
          complete your donation
        </p>

        <button
          disabled={methods.formState.isSubmitting}
          className="btn-orange btn-donate mt-2"
          type="submit"
        >
          <LoadText
            text="Processing..."
            isLoading={methods.formState.isSubmitting}
          >
            Continue
          </LoadText>
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
