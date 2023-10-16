import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { OptionType } from "components/Selector";
import createSchema from "./createSchema";

export default function useRecipientForm(
  targetCurrency: string,
  accountRequirements: AccountRequirements[]
) {
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

function getDefaultValues(
  accountRequirements: AccountRequirements[]
): Record<string, Record<string, string | OptionType<string>>> {
  return accountRequirements.reduce(
    (defaultValues, curRequirements) => {
      defaultValues[curRequirements.type] = curRequirements.fields.reduce(
        (objectShape, field) => {
          const requirements = field.group[0];
          if (requirements.type === "text") {
            objectShape[requirements.key] = "";
          } else {
            objectShape[requirements.key] = { label: "", value: "" };
          }
          return objectShape;
        },
        {} as Record<string, string | OptionType<string>>
      );
      return defaultValues;
    },
    {} as FormValues["requirements"]
  );
}
