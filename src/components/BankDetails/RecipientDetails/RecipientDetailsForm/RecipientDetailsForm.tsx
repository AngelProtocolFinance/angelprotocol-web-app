import { ComponentType, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { FormButtonsProps } from "../../types";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { Currency } from "../../CurrencySelector";
import Form from "./Form";
import useRecipientDetailsForm from "./useRecipientDetailsForm";

type Props = {
  accountRequirements: AccountRequirements;
  currency: Currency;
  defaultValues: FormValues;
  disabled: boolean;
  refreshedRequirementsAdded: boolean;
  refreshRequired: boolean;
  FormButtons: ComponentType<FormButtonsProps>;
  onUpdateValues: (formValues: FormValues) => void;
  onRefresh: (request: CreateRecipientRequest) => Promise<void>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

export default function RecipientDetailsForm(props: Props) {
  const methods = useRecipientDetailsForm(
    props.accountRequirements,
    props.defaultValues
  );

  const { onUpdateValues } = props;
  const { getValues } = methods;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
  useEffect(() => {
    return () => {
      onUpdateValues(getValues());
    };
  }, [getValues, onUpdateValues]);

  return (
    <FormProvider {...methods}>
      <Form
        accountRequirements={props.accountRequirements}
        currency={props.currency}
        disabled={props.disabled}
        refreshedRequirementsAdded={props.refreshedRequirementsAdded}
        refreshRequired={props.refreshRequired}
        onRefresh={async (request) => {
          // update current form values prior to refreshing the form (loads new fields)
          onUpdateValues(getValues());
          await props.onRefresh(request);
        }}
        onSubmit={props.onSubmit}
        FormButtons={props.FormButtons}
      />
    </FormProvider>
  );
}
