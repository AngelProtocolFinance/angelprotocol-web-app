import { yupResolver } from "@hookform/resolvers/yup";
import CurrencySelector from "components/CurrencySelector";
import { Field, Form as FormContainer } from "components/form";
import { useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import { setDetails } from "slices/donation";
import { useSetter } from "store/accessors";
import { DetailedCurrency } from "types/components";
import ContinueBtn from "../../common/ContinueBtn";
import { FormValues as FV, Props } from "./types";

/**
 * Only USD donations are permissible for DAF donations.
 * The minimum amount should not be hardcoded as it differs depending on which provider is selected.
 */
const USD_CURRENCY: DetailedCurrency = { code: "usd", rate: 1, min: 1 };

export default function Form({ widgetConfig, details }: Props) {
  const dispatch = useSetter();

  const initial: FV = {
    source: widgetConfig ? "bg-widget" : "bg-marketplace",
    amount: "",
    currency: USD_CURRENCY,
  };

  const methods = useForm<FV>({
    defaultValues: details || initial,
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("required"),
          (n) => n.positive("must be greater than 0")
        ),
      })
    ),
  });
  const { handleSubmit } = methods;

  return (
    <FormContainer
      methods={methods}
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
        classes={{
          label: "font-semibold",
          combobox: "field-container-donate",
          container: "field-donate",
        }}
        required
      />
      <Field<FV>
        name="amount"
        label="Donation amount"
        placeholder="Enter amount"
        classes={{ label: "font-semibold", container: "field-donate mt-1" }}
        required
        tooltip="The minimum donation amount will depend on your DAF provider."
      />

      <p className="text-sm text-navy-d4 dark:text-navy-l2 mt-4">
        Please click the button below and follow the instructions provided to
        complete your donation
      </p>

      <ContinueBtn className="mt-2" type="submit" />
    </FormContainer>
  );
}
