import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { Field } from "components/form";
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

  const fields = accountRequirements.fields.map(({ group }) => {
    const requirements = group[0];

    if (requirements.type === "text") {
      return (
        <Field<FormValues>
          key={`details.${requirements.key}`}
          classes="field-admin"
          name={`details.${requirements.key}`}
          label={requirements.name}
          placeholder={requirements.example}
        />
      );
    }

    return null;
  });

  return <FormProvider {...methods}>{fields}</FormProvider>;
}
