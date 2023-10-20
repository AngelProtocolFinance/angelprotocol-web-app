import { useEffect } from "react";
import { FormProvider, Path } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { isEmpty } from "helpers";
import { undot } from "./dot";
import useRecipientForm from "./useRecipientForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues;
  onCleanup: (formValues: FormValues) => void;
  targetCurrency: string;
};

export default function Form({
  accountRequirements,
  defaultValues,
  onCleanup,
  targetCurrency,
}: Props) {
  const methods = useRecipientForm(
    accountRequirements,
    targetCurrency,
    defaultValues
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formValues) => {
    console.log("formValues");
    console.log(formValues);
  });

  useEffect(
    () => () => {
      onCleanup(methods.getValues());
    },
    [methods, onCleanup]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          {accountRequirements.fields.map((field) => {
            const requirements = field.group[0];

            const requirementsKey = undot(requirements.key);

            const name: Path<FormValues> = `requirements.${requirementsKey}`;

            if (requirements.type === "date") {
              return (
                <Field<FormValues, "date">
                  key={name}
                  name={name}
                  type="date"
                  label={requirements.name}
                  required={requirements.required}
                  classes={{
                    input: "date-input uppercase",
                    container: "field-admin",
                  }}
                />
              );
            }

            if (
              requirements.type === "text" ||
              // if by any chance there are fields that are of type `"text"`, but DO have `valuesAllowed` defined,
              // they should be treated as selectors
              !requirements.valuesAllowed ||
              isEmpty(requirements.valuesAllowed)
            ) {
              return (
                <Field<FormValues>
                  key={name}
                  name={name}
                  label={requirements.name}
                  placeholder={requirements.example}
                  required={requirements.required}
                  classes="field-admin"
                />
              );
            }

            return (
              <div key={name} className="flex flex-col">
                <Label required={requirements.required}>
                  {requirements.name}
                </Label>
                <Selector<FormValues, string>
                  name={name}
                  options={requirements.valuesAllowed.map((valuesAllowed) => ({
                    label: valuesAllowed.name,
                    value: valuesAllowed.key,
                  }))}
                />
              </div>
            );
          })}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-orange text-sm w-80"
        >
          Save
        </button>
      </form>
    </FormProvider>
  );
}
