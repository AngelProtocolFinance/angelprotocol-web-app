import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import FileDropzone from "components/FileDropzone";
import { Label } from "components/form";
import RequirementField from "./RequirementField";
import { MB_LIMIT, VALID_MIME_TYPES } from "./constants";
import formToCreateRecipientRequest from "./formToCreateRecipientRequest";

const fileTooltip = `Valid types are: ${VALID_MIME_TYPES.join(
  ", "
)}. File should be less than ${MB_LIMIT}MB.`;

type Props = {
  accountRequirements: AccountRequirements;
  disabled: boolean;
  refreshRequired: boolean;
  formButtons: (
    disabled: boolean,
    isSubmitting: boolean,
    refreshRequired: boolean
  ) => ReactNode;
  onRefresh: (request: CreateRecipientRequest) => Promise<void>;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset,
    isDirty: boolean
  ) => Promise<void>;
};

export default function Form(props: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useFormContext<FormValues>();

  const handleSubmission = handleSubmit(async (formValues) => {
    const { bankStatementFile, ...bankDetails } = formValues;
    const request = formToCreateRecipientRequest(bankDetails);
    if (props.refreshRequired) {
      await props.onRefresh(request);
    } else {
      await props.onSubmit(request, bankStatementFile, isDirty);
    }
  });

  return (
    <form onSubmit={handleSubmission} className="grid gap-6">
      {props.accountRequirements.fields
        .flatMap((field) => field.group)
        .map((requirements) => (
          <RequirementField
            key={requirements.key}
            data={requirements}
            disabled={props.disabled}
          />
        ))}

      <div className="field">
        <Label required>Please provide your Bank Statement</Label>
        <FileDropzone<FormValues, "bankStatementFile">
          name="bankStatementFile"
          tooltip={fileTooltip}
        />
      </div>

      {props.formButtons(props.disabled, isSubmitting, props.refreshRequired)}
    </form>
  );
}
