import { ComponentType, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { FormButtonsProps } from "../../types";
import { FormValues, RequirementsData } from "../types";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { Currency } from "../../../CurrencySelector";
import Form from "./Form";
import useRecipientDetailsForm from "./useRecipientDetailsForm";

type Props = {
  currency: Currency;
  disabled: boolean;
  focusNewRequirements: boolean;
  FormButtons: ComponentType<FormButtonsProps>;
  requirementsData: RequirementsData;
  onRefresh: (request: CreateRecipientRequest) => Promise<void>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
  onUpdateValues: (formValues: FormValues) => void;
};

export default function RecipientDetailsForm(props: Props) {
  const methods = useRecipientDetailsForm(
    props.requirementsData.accountRequirements,
    props.requirementsData.currentFormValues
  );

  const { onUpdateValues, onRefresh, ...rest } = props;
  const { getValues } = methods;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
  useEffect(() => {
    return () => {
      onUpdateValues(getValues());
    };
  }, [getValues, onUpdateValues]);

  const handleRefresh = async (request: CreateRecipientRequest) => {
    onUpdateValues(getValues()); // update current form values prior to refreshing the form (which loads new fields)
    await onRefresh(request);
  };
  return (
    <FormProvider {...methods}>
      <Form onRefresh={handleRefresh} {...rest} />
    </FormProvider>
  );
}
