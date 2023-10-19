import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import AccountRequirementsSelector from "../AccountRequirementsSelector";
import Form from "./Form";
import useRecipientForm from "./useRecipientForm";

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements[];
};

export default function RecipientDetailsForm({
  accountRequirements,
  targetCurrency,
}: Props) {
  const [
    selectedAccountRequirementsIndex,
    setSelectedAccountRequirementsIndex,
  ] = useState<number>();

  const methods = useRecipientForm(targetCurrency, accountRequirements);

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={accountRequirements}
        onChange={(index: number) => setSelectedAccountRequirementsIndex(index)}
      />
      <FormProvider {...methods}>
        {selectedAccountRequirementsIndex != null && (
          <Form
            accountRequirements={
              accountRequirements[selectedAccountRequirementsIndex]
            }
          />
        )}
      </FormProvider>
    </>
  );
}
