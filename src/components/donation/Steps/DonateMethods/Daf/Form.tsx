import { yupResolver } from "@hookform/resolvers/yup";
import CurrencySelector from "components/CurrencySelector";
import { Field, Form as FormContainer } from "components/form";
import { useForm } from "react-hook-form";
import { schema, stringNumber } from "schemas/shape";
import type { DetailedCurrency } from "types/components";
import { useDonationState } from "../../Context";
import ContinueBtn from "../../common/ContinueBtn";
import { EMPTY_PROGRAM } from "../../common/constants";
import { nextFormState } from "../helpers";
import type { FormValues as FV, Props } from "./types";

/**
 * Only USD donations are permissible for DAF donations.
 * The minimum amount should not be hardcoded as it differs depending on which provider is selected.
 */
const USD_CURRENCY: DetailedCurrency = { code: "usd", rate: 1, min: 1 };

export default function Form(props: Props) {
  const { setState } = useDonationState();

  const initial: FV = {
    amount: "",
    currency: USD_CURRENCY,
    program: EMPTY_PROGRAM,
  };

  const methods = useForm<FV>({
    defaultValues: props.details || initial,
    resolver: yupResolver(
      schema<FV>({
        amount: stringNumber(
          (s) => s.required("Please enter an amount"),
          (n) => n.positive("Amount must be greater than 0")
        ),
      })
    ),
  });
  const { handleSubmit } = methods;

  return (
    <FormContainer
      methods={methods}
      onSubmit={handleSubmit((fv) =>
        setState((prev) => nextFormState(prev, { ...fv, method: "daf" }))
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
