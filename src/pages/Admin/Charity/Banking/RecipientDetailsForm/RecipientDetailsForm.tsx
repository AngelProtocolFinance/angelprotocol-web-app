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
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const methods = useRecipientForm(targetCurrency, accountRequirements);

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={accountRequirements}
        onChange={(index: number) => setSelectedIndex(index)}
      />
      <FormProvider {...methods}>
        {selectedIndex != null && (
          <Form accountRequirements={accountRequirements[selectedIndex]} />
        )}
      </FormProvider>
    </>
  );
}
