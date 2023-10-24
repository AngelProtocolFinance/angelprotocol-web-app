import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { FormValues } from "./types";
import { AccountRequirements, CreateRecipientRequest, Quote } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useWiseMutationProxy } from "services/aws/bankDetails";
import { useErrorContext } from "contexts/ErrorContext";
import LoaderRing from "components/LoaderRing";
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
  const { id } = useAdminContext();
  const { postAccountRequirements, createRecipientAccount } =
    useWiseMutationProxy();
  const { handleError } = useErrorContext();

  const { methods, refreshRequirementsNeeded } = useRecipientForm(
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
    try {
      const request = convertToCreateRecipientRequest(formValues);

      // refresh requirements if necessary
      if (!props.requirementsRefreshed && refreshRequirementsNeeded) {
        const accReqs = await postAccountRequirements(props.quote.id, request);
        props.onRefreshRequirements(accReqs);
      }
      // otherwise create the recipient
      else {
        await createRecipientAccount(id, request);
      }
    } catch (error) {
      handleError(error);
    }
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
