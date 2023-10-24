import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import LoaderRing from "components/LoaderRing";
import RequirementField from "./RequirementField";
import { redot } from "./dot";
import useForm from "./useForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues | undefined;
  onCleanup: (formValues: FormValues) => void;
  onSubmit: (
    request: CreateRecipientRequest,
    refreshRequirementsNeeded: boolean
  ) => void;
  targetCurrency: string;
};

export default function Form(props: Props) {
  const { methods, refreshRequirementsNeeded } = useForm(
    props.accountRequirements,
    props.targetCurrency,
    props.defaultValues
  );

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formValues) => {
    const request = convertToCreateRecipientRequest(formValues);
    props.onSubmit(request, refreshRequirementsNeeded);
  });

  const { onCleanup } = props;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
  useEffect(
    () => () => {
      onCleanup(getValues());
    },
    [getValues, onCleanup]
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
          {isSubmitting ? (
            <>
              <LoaderRing thickness={10} classes="w-6" /> Submitting...
            </>
          ) : (
            "Save"
          )}
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
