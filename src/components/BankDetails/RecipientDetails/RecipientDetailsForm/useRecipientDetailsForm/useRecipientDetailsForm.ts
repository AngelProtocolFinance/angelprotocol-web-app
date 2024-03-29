import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormReturn, useForm } from "react-hook-form";
import { FormValues } from "../../types";
import { AccountRequirements } from "types/aws";
import createSchema from "./createSchema";

/**
 *
 * @param accountRequirements account requirement field data
 * @param targetCurrency target currency for the recipient
 * @param initValues initial values
 * @returns an object `methods` used to initialize `react-hook-form`
 */
export default function useRecipientDetailsForm(
  accountRequirements: AccountRequirements,
  initValues: FormValues
): UseFormReturn<FormValues, any, undefined> {
  const schema = createSchema(accountRequirements);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: initValues,
  });

  return methods;
}
