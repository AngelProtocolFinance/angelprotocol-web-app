import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { AccountRequirements, CreateRecipientRequest, Quote } from "../types";
import { FormValues } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import useTypedWiseMutation from "../useTypedWiseMutation";
import RequirementField from "./RequirementField";
import { redot } from "./dot";
import useRecipientForm from "./useRecipientForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues | undefined;
  onCleanup: (formValues: FormValues) => void;
  onRefreshRequirements: (accountRequirements: AccountRequirements) => void;
  targetCurrency: string;
  requirementsRefreshed: boolean;
  quote: Quote;
};

export default function Form(props: Props) {
  const { methods, refreshRequirementsOnChange } = useRecipientForm(
    props.accountRequirements,
    props.targetCurrency,
    props.defaultValues
  );
  // if requirements have already been refreshed, there's no need to do this a 2nd time
  const [refreshRequirements, setRefreshRequirements] = useState(
    !props.requirementsRefreshed && refreshRequirementsOnChange
  );
  const { postAccountRequirements } = useTypedWiseMutation();
  const { handleError } = useErrorContext();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit((formValues) => {
    const request = convertToCreateRecipientRequest(formValues);
    if (refreshRequirements) {
      postAccountRequirements(props.quote.id, request)
        .then((accReqs) => {
          setRefreshRequirements(false);
          props.onRefreshRequirements(accReqs);
        })
        .catch((error) => handleError(error));
    } else {
      console.log("request");
      console.log(request);
    }
  });

  const { onCleanup } = props;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
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
          {props.accountRequirements.fields.map((field) => {
            const data = field.group[0]; // seems that `field.group.length === 1` in all cases
            return <RequirementField key={data.key} data={data} />;
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
    details: Object.entries(formValues.requirements).reduce<
      CreateRecipientRequest["details"]
    >((details, [key, value]) => {
      details[redot(key)] = typeof value === "object" ? value.value : value;
      return details;
    }, {}),
  };
}
