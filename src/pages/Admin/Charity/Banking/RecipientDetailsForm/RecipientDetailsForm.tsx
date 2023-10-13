import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { AccountRequirements } from "../types";
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
      details: {},
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
