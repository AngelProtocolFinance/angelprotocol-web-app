import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ObjectSchema, object } from "yup";
import { AccountRequirements, CreateRecipientRequest } from "../types";
import { SchemaShape } from "schemas/types";
import Form from "./Form";
import { requiredString } from "schemas/string"

type FormValues = CreateRecipientRequest;

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements;
};

export default function RecipientDetailsForm({
  accountRequirements,
  targetCurrency,
}: Props) {
  const schema = object<any, SchemaShape<FormValues>>(
    {
      currency: requiredString,
      type: requiredString,
      accountHolderName: requiredString,
      details: object(accountRequirements.fields.reduce((objectShape, field) => {
        const requirements = field.group[0];
        objectShape[requirements.key] = requirements.
        return objectShape
      }, {} as any))
    }
  ) as ObjectSchema<FormValues>;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currency: targetCurrency,
      type: accountRequirements.type,
      accountHolderName: "ENDOWMENT_NAME",
      details: {
        
      }
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
