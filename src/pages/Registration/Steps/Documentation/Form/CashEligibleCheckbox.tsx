import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { CheckField } from "components/form";

const CASH_ELIGIBLE_COUNTRIES = [
  "New Zealand",
  "United States",
  "United Kingdom",
];

export function CashEligibleCheckbox() {
  const { watch } = useFormContext<FV>();
  const countryName = watch("hqCountry.name");
  return CASH_ELIGIBLE_COUNTRIES.includes(countryName) ? (
    <CheckField<FV>
      name="cashEligible"
      required
      classes={{
        container: "check-field-reg text-sm mb-3",
        input: "checkbox-reg self-start sm:self-center",
        error: "mt-1",
      }}
    >
      By checking this box, you declare that you are eligible for cash donation
      processing by APES
    </CheckField>
  ) : null;
}
