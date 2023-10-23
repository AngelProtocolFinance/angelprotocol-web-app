import { useEffect, useState } from "react";
import { FormProvider, useFieldArray } from "react-hook-form";
import { AccountRequirements, CreateRecipientRequest, Quote } from "../types";
import { FormValues } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import useTypedWiseMutation from "../useTypedWiseMutation";
import RequirementField from "./RequirementField";
import { redot } from "./dot";
import useRecipientForm from "./useRecipientForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues;
  onCleanup: (formValues: FormValues) => void;
  onRefreshRequirements: (accountRequirements: AccountRequirements[]) => void;
  targetCurrency: string;
  quote: Quote;
};

export default function Form(props: Props) {
  const { methods, refreshRequirementsOnChange } = useRecipientForm(
    props.accountRequirements,
    props.targetCurrency,
    props.defaultValues
  );
  const [refreshRequirements, setRefreshRequirements] = useState(
    refreshRequirementsOnChange
  );
  const { fields, append } = useFieldArray({
    name: "requirements",
    control: methods.control,
  });
  const { postAccountRequirements } = useTypedWiseMutation();
  const { handleError } = useErrorContext();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit((formValues) => {
    const request = convertToCreateRecipientRequest(formValues);
    if (refreshRequirements) {
      console.log("load additional fields");
      setRefreshRequirements(false);
      postAccountRequirements(props.quote.id, request)
        .then((accReqs) => props.onRefreshRequirements(accReqs))
        .catch((error) => handleError(error));
    } else {
      console.log("request");
      console.log(request);
    }
  });

  const { onCleanup } = props;

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
          {fields.map((field, index) => {
            const data = props.accountRequirements.fields[index].group[0]; // seems that `field.group.length === 1` in all cases
            return (
              <RequirementField key={field.id} data={data} index={index} />
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

function convertToCreateRecipientRequest(
  formValues: FormValues
): CreateRecipientRequest {
  return {
    accountHolderName: formValues.accountHolderName,
    currency: formValues.currency,
    type: formValues.type,
    details: formValues.requirements.reduce<Record<string, string>>(
      (details, { key, value }) => {
        details[redot(key)] = typeof value === "object" ? value.value : value;
        return details;
      },
      {}
    ),
  };
}
