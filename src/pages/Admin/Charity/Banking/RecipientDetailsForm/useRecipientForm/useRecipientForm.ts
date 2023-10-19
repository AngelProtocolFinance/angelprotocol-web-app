import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormReturn, useForm } from "react-hook-form";
import { AccountRequirements } from "../../types";
import { FormValues } from "../types";
import createSchema from "./createSchema";
import getDefaultValues from "./getDefaultValues";

export default function useRecipientForm(
  targetCurrency: string,
  accountRequirements: AccountRequirements[]
): UseFormReturn<FormValues, any, undefined> {
  const schema = createSchema(accountRequirements);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      currency: targetCurrency,
      accountHolderName: "ENDOWMENT_NAME",
      requirements: getDefaultValues(accountRequirements),
    },
  });

  return methods;
}
