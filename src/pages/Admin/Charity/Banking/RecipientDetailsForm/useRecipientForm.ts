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

          // react-hook-form turns dot-fields into nested objects, https://github.com/react-hook-form/react-hook-form/issues/3755#issuecomment-943408807
          const key = requirements.key.replace(".", "__");

          if (requirements.type === "text") {
            objectShape[key] = "";
          } else {
            objectShape[key] = {
              label: requirements.example, // this field contains dropdown placeholder text for `select`; for `radio` it's empty string
              value: "",
            };
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
