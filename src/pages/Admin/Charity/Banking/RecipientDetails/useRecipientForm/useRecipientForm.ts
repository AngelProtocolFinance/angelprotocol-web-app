import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormReturn, useForm } from "react-hook-form";
import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import createSchema from "./createSchema";
import getDefaultValues from "./getDefaultValues";

export default function useRecipientForm(
  accountRequirements: AccountRequirements,
  targetCurrency: string,
  defaultValues: FormValues = getDefaultValues(
    accountRequirements,
    targetCurrency
  )
): UseFormReturn<FormValues, any, undefined> {
  const schema = createSchema(accountRequirements);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  return methods;
}
