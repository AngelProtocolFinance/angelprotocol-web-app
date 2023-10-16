import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import Form from "./Form";
import useRecipientForm from "./useRecipientForm";

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements;
};

export default function RecipientDetailsForm({
  accountRequirements,
  targetCurrency,
}: Props) {
  const methods = useRecipientForm(targetCurrency, accountRequirements);

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}
