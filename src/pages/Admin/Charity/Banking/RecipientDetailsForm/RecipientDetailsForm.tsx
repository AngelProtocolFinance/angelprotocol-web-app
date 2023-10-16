import { FormProvider } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { Field } from "components/form";
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

  const fields = accountRequirements.fields.map(({ group }) => {
    const fieldGroup = group[0];

    if (fieldGroup.type === "text") {
      return (
        <Field<FormValues>
          classes="field-admin"
          name={`details.${fieldGroup.key}`}
          label={fieldGroup.name}
          placeholder={fieldGroup.example}
        />
      );
    }
  });

  return <FormProvider {...methods}>{fields}</FormProvider>;
}
