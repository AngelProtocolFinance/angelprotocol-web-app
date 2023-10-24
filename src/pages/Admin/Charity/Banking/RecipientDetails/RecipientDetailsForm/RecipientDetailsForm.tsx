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
    refreshRequirementsNeeded: boolean
  ) => void;
  targetCurrency: string;
};

export default function RecipientDetailsForm(props: Props) {
  const { methods, refreshRequirementsNeeded } = useRecipientDetailsForm(
    props.accountRequirements,
    props.targetCurrency,
    props.defaultValues
  );

  const { onCleanup } = props;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
  useEffect(
    () => () => {
      onCleanup(methods.getValues());
    },
    [methods, onCleanup]
  );

  const handleSubmit = (request: CreateRecipientRequest) => {
    props.onSubmit(request, refreshRequirementsNeeded);
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
