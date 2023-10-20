import { UseFormReturn, useForm } from "react-hook-form";
import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import getDefaultValues from "./getDefaultValues";

type Result = {
  methods: UseFormReturn<FormValues, any, undefined>;
  refreshRequirementsOnChange: boolean;
};

/**
 *
 * @param accountRequirements account requirement field data
 * @param targetCurrency target currency for the recipient
 * @param initValues initial values
 * @returns an object containing 2 fields:
 *  - `methods`: used to initialize `react-hook-form`
 *  - `refreshRequirementsOnChange`: boolean value representing whether additional fields need to
 *    be loaded after filling the form.
 *
 *    For more info on `refreshRequirementsOnChange`, see https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
 */
export default function useRecipientForm(
  accountRequirements: AccountRequirements,
  targetCurrency: string,
  initValues: FormValues = getDefaultValues(accountRequirements, targetCurrency)
): Result {
  const methods = useForm<FormValues>({
    defaultValues: initValues,
  });

  const refreshRequirementsOnChange = accountRequirements.fields.some(
    (field) => field.group[0].refreshRequirementsOnChange
  );

  return { methods, refreshRequirementsOnChange };
}
