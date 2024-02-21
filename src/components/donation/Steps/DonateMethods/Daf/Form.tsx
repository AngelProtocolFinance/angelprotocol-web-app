import { yupResolver } from "@hookform/resolvers/yup";
import CurrencySelector from "components/CurrencySelector";
import { CheckField, Field } from "components/form";
import { FormProvider, useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { requiredString } from "schemas/string";
import { setDetails } from "slices/donation";
import { useGetter, useSetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { Currency } from "types/components";
import { FormValues as FV, Props } from "./types";

// Chariot accepts only USD.
// See https://givechariot.readme.io/reference/integrating-connect#response-objects
//
// The minimum amount should not be hardcoded as it differs depending on which provider is selected.
// See https://givechariot.readme.io/reference/create-grant
const USD_CURRENCY: Currency = { code: "usd", rate: 1 };

export default function Form({ recipient, widgetConfig, details }: Props) {
  const authUser = useGetter((state) => state.auth.user);
  const dispatch = useSetter();
  const authUserEmail = userIsSignedIn(authUser) ? authUser.email : "";

  const initial: FV = {
    source: widgetConfig ? "bg-widget" : "bg-marketplace",
    amount: "",
    currency: USD_CURRENCY,
    email: authUserEmail,
    userOptForKYC: false,
  };

  const methods = useForm<FV>({
    defaultValues: details || initial,
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("required"),
          (n) => n.positive("must be greater than 0")
        ),
        email: requiredString.trim().email("invalid email"),
      })
    ),
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((fv) =>
          dispatch(
            setDetails({
              ...fv,
              method: "daf",
            })
          )
        )}
        className="grid gap-4"
      >
        <CurrencySelector
          currencies={[USD_CURRENCY]}
          label="Currency"
          // only one currency available, so can't change it
          onChange={() => {}}
          value={USD_CURRENCY}
          classes={{ label: "font-semibold" }}
          required
        />
        <Field<FV>
          name="amount"
          label="Donation amount"
          classes={{ label: "font-semibold" }}
          required
          tooltip="The minimum donation amount will depend on your DAF provider."
        />
        {!authUserEmail && (
          <Field<FV>
            name="email"
            label="Email"
            required
            classes={{ label: "font-semibold" }}
          />
        )}
        {!recipient.isKYCRequired && (
          // if KYC is required, the checkbox is redundant
          <CheckField<FV>
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

        <button className="btn-orange btn-donate mt-2" type="submit">
          Continue
        </button>
      </form>
    </FormProvider>
  );
}
