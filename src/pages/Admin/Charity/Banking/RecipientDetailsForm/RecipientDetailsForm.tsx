import { useMemo, useState } from "react";
import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { isEmpty } from "helpers";
import AccountRequirementsSelector from "../AccountRequirementsSelector";
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

  const fields = useMemo(() => {
    if (selectedAccountRequirementsIndex == null) {
      return null;
    }

    const selectedRequirements =
      accountRequirements[selectedAccountRequirementsIndex];

    return selectedRequirements.fields.map((field) => {
      const requirements = field.group[0];

      // react-hook-form turns dot-fields into nested objects, https://github.com/react-hook-form/react-hook-form/issues/3755#issuecomment-943408807
      const requirementsKey = requirements.key.replace(".", "__");

      if (
        requirements.type === "text" ||
        !requirements.valuesAllowed ||
        isEmpty(requirements.valuesAllowed)
      ) {
        return (
          <Field<FormValues>
            key={`requirements.${selectedRequirements.type}.${requirementsKey}`}
            classes="field-admin"
            name={`requirements.${selectedRequirements.type}.${requirementsKey}`}
            label={requirements.name}
            placeholder={requirements.example}
          />
        );
      }

      return (
        <div
          key={`requirements.${selectedRequirements.type}.${requirementsKey}`}
          className="flex flex-col"
        >
          <Label required={requirements.required}>{requirements.name}</Label>
          <Selector<FormValues, string>
            name={`requirements.${selectedRequirements.type}.${requirementsKey}`}
            options={requirements.valuesAllowed.map((valuesAllowed) => ({
              label: valuesAllowed.name,
              value: valuesAllowed.key,
            }))}
          />
        </div>
      );
    });
  }, [accountRequirements, selectedAccountRequirementsIndex]);

  return (
    <>
      <AccountRequirementsSelector
        accountRequirements={accountRequirements}
        onChange={(index: number) => setSelectedAccountRequirementsIndex(index)}
      />
      <FormProvider {...methods}>{fields}</FormProvider>
    </>
  );
}
