import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { Field } from "components/form";
import useRecipientForm from "./useRecipientForm";

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements[];
  accountRequirementsIndex: number;
};

export default function RecipientDetailsForm({
  accountRequirements,
  accountRequirementsIndex,
  targetCurrency,
}: Props) {
  const methods = useRecipientForm(targetCurrency, accountRequirements);

  const selectedRequirements = accountRequirements[accountRequirementsIndex];

  const fields = selectedRequirements.fields.map((field) => {
    const requirements = field.group[0];

    if (requirements.type === "text") {
      return (
        <Field<FormValues>
          key={`requirements.${selectedRequirements.type}.${requirements.key}`}
          classes="field-admin"
          name={`requirements.${selectedRequirements.type}.${requirements.key}`}
          label={requirements.name}
          placeholder={requirements.example}
        />
      );
    }

    return null;
  });

  return <FormProvider {...methods}>{fields}</FormProvider>;
}
