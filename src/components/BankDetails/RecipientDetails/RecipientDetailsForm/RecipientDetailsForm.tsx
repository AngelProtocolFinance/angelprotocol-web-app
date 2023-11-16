import { ReactNode, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import Form from "./Form";
import useRecipientDetailsForm from "./useRecipientDetailsForm";

type Props = {
  accountRequirements: AccountRequirements;
  defaultValues: FormValues;
  disabled: boolean;
  refreshRequired: boolean;
  children: (
    disabled: boolean,
    isSubmitting: boolean,
    refreshRequired: boolean
  ) => ReactNode;
  onCleanup: (formValues: FormValues) => void;
  onRefresh: (request: CreateRecipientRequest) => void;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => void;
};

export default function RecipientDetailsForm(props: Props) {
  const methods = useRecipientDetailsForm(
    props.accountRequirements,
    props.defaultValues
  );

  const { onCleanup } = props;
  const { getValues } = methods;

  // save current form values so that they can be preloaded
  // when switching between account requirement types
  useEffect(() => {
    return () => {
      onCleanup(getValues());
    };
  }, [getValues, onCleanup]);

  return (
    <FormProvider {...methods}>
      <Form
        accountRequirements={props.accountRequirements}
        disabled={props.disabled}
        refreshRequired={props.refreshRequired}
        onRefresh={props.onRefresh}
        onSubmit={props.onSubmit}
      >
        {props.children}
      </Form>
    </FormProvider>
  );
}
