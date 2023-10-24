import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormReturn, useForm } from "react-hook-form";
import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import createSchema from "./createSchema";
import getDefaultValues from "./getDefaultValues";

type Result = {
  methods: UseFormReturn<FormValues, any, undefined>;
  refreshRequirementsNeeded: boolean;
};

/**
 *
 * @param accountRequirements account requirement field data
 * @param targetCurrency target currency for the recipient
 * @param initValues initial values
 * @returns an object containing 2 fields:
 *  - `methods`: used to initialize `react-hook-form`
 *  - `refreshRequirementsNeeded`: boolean value representing whether additional fields need to
 *    be loaded after filling the form.
 *
 *    For more info on `refreshRequirementsNeeded`, see https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
 */
export default function useRecipientForm(
  accountRequirements: AccountRequirements,
  targetCurrency: string,
  initValues: FormValues = getDefaultValues(accountRequirements, targetCurrency)
): Result {
  const schema = createSchema(accountRequirements);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initValues,
  });

  const refreshRequirementsNeeded = accountRequirements.fields.some(
    (field) => field.group[0].refreshRequirementsOnChange
  );

  return { methods, refreshRequirementsNeeded };
}
