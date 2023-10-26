import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import Form from "./Form";
import useRecipientDetailsForm from "./useRecipientDetailsForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues | undefined;
  onCleanup: (formValues: FormValues) => void;
  onSubmit: (
    request: CreateRecipientRequest,
    refreshRequirements: boolean
  ) => void;
  targetCurrency: string;
};

export default function RecipientDetailsForm(props: Props) {
  const { methods, refreshRequirementsOnSubmit } = useRecipientDetailsForm(
    props.accountRequirements,
    props.targetCurrency,
    props.defaultValues
  );

  const { onCleanup } = props;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
  useEffect(() => {
    return () => {
      onCleanup(methods.getValues());
    };
  }, [methods, onCleanup]);

  const handleSubmit = (request: CreateRecipientRequest): void => {
    props.onSubmit(request, refreshRequirementsOnSubmit);
  };

  return (
    <FormProvider {...methods}>
      <Form
        accountRequirements={props.accountRequirements}
        onSubmit={handleSubmit}
      />
    </FormProvider>
  );
}
