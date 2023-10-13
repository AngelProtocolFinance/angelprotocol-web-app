import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { OptionType } from "components/Selector";
import Form from "./Form";
import createSchema from "./createSchema";

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements;
};

export default function RecipientDetailsForm({
  accountRequirements,
  targetCurrency,
}: Props) {
  const schema = createSchema(accountRequirements);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currency: targetCurrency,
      type: accountRequirements.type,
      accountHolderName: "ENDOWMENT_NAME",
      details: getDefaultValues(accountRequirements),
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
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
