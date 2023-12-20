import { ComponentType, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormButtonsProps } from "../../types";
import { FormValues, RequirementsData } from "../types";
import { CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import FileDropzone from "components/FileDropzone";
import { Label } from "components/form";
import { Currency } from "../../../CurrencySelector";
import RequirementField from "./RequirementField";
import { MB_LIMIT, VALID_MIME_TYPES } from "./constants";
import formToCreateRecipientRequest from "./formToCreateRecipientRequest";

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
};

export default function Form(props: Props) {
  const {
    currency,
    disabled,
    focusNewRequirements,
    requirementsData,
    FormButtons,
    onRefresh,
    onSubmit,
  } = props;

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FormValues>();

  const form = useRef<HTMLFormElement>(null);

  const handleSubmission = handleSubmit(async (formValues) => {
    const { bankStatementFile, ...bankDetails } = formValues;
    const request = formToCreateRecipientRequest(bankDetails);
    if (requirementsData.refreshRequired) {
      await onRefresh(request);
    } else {
      await onSubmit(request, bankStatementFile, isDirty);
    }
  });

  // this should run only when new requirement fields are added
  // manually requesting a form submission will run the validation logic
  // and immediately validate all the newly added fields, clearly marking all the
  // invalid ones to make it easier for the user to notice them
  useEffect(() => {
    if (focusNewRequirements && form.current) {
      form.current.requestSubmit();
    }
  }, [focusNewRequirements]);

  return (
    <form onSubmit={handleSubmission} ref={form} className="grid gap-6">
      {requirementsData.accountRequirements.fields
        .flatMap((field) => field.group)
        .map((requirements) => (
          <RequirementField
            key={requirements.key}
            currency={currency}
            data={requirements}
            disabled={disabled}
            requirementsType={requirementsData.accountRequirements.type}
          />
        ))}

      <div className="field">
        <Label required>Please provide your Bank Statement</Label>
        <FileDropzone<FormValues, "bankStatementFile">
          name="bankStatementFile"
          specs={{ mbLimit: MB_LIMIT, mimeTypes: VALID_MIME_TYPES }}
          disabled={disabled}
        />
      </div>

      <FormButtons
        disabled={disabled}
        isSubmitting={isSubmitting}
        refreshedRequirementsAdded={requirementsData.refreshedRequirementsAdded}
        refreshRequired={requirementsData.refreshRequired}
      />
    </form>
  );
}
