import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { OptionType } from "components/Selector";
import createSchema from "./createSchema";

export default function useRecipientForm(
  targetCurrency: string,
  accountRequirements: AccountRequirements
) {
  const schema = createSchema(accountRequirements);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      currency: targetCurrency,
      type: accountRequirements.type,
      accountHolderName: "ENDOWMENT_NAME",
      details: getDefaultValues(accountRequirements),
    },
  });

  useEffect(() => {
    methods.setValue("currency", targetCurrency);
  }, [targetCurrency, methods]);

  return methods;
}

function getDefaultValues(
  accountRequirements: AccountRequirements
): Record<string, string | OptionType<string>> {
  return accountRequirements.fields.reduce(
    (objectShape, field) => {
      const requirements = field.group[0];

      if (requirements.type === "text") {
        objectShape[requirements.key] = requirements.example;
      } else {
        objectShape[requirements.key] = { label: "", value: "" };
      }

      return objectShape;
    },
    {} as FormValues["details"]
  );
}
