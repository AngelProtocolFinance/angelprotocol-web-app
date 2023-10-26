import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormReturn, useForm } from "react-hook-form";
import { FormValues } from "../../types";
import { AccountRequirements } from "types/aws";
import createSchema from "./createSchema";
import getDefaultValues from "./getDefaultValues";

type Result = {
  methods: UseFormReturn<FormValues, any, undefined>;
  refreshRequirementsOnSubmit: boolean;
};

/**
 *
 * @param accountRequirements account requirement field data
 * @param targetCurrency target currency for the recipient
 * @param initValues initial values
 * @returns an object containing 2 fields:
 *  - `methods`: used to initialize `react-hook-form`
 *  - `refreshRequirementsOnSubmit`: boolean value representing whether additional fields need to
 *    be loaded after submitting the form.
 *
 *    For more info on `refreshRequirementsOnSubmit`, see https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
 */
export default function useRecipientDetailsForm(
  accountRequirements: AccountRequirements,
  targetCurrency: string,
  initValues: FormValues = getDefaultValues(accountRequirements, targetCurrency)
): Result {
  const schema = createSchema(accountRequirements);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initValues,
  });

  const refreshRequirementsOnSubmit = accountRequirements.fields.some((field) =>
    field.group.some((group) => group.refreshRequirementsOnChange)
  );

  return { methods, refreshRequirementsOnSubmit };
}
