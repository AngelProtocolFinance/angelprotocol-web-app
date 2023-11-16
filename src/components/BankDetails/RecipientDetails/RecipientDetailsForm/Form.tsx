import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import FileDropzone from "components/FileDropzone";
import { Label } from "components/form";
import { MB_LIMIT } from "schemas/file";
import RequirementField from "./RequirementField";
import formToCreateRecipientRequest from "./formToCreateRecipientRequest";

type Props = {
  accountRequirements: AccountRequirements;
  disabled: boolean;
  refreshRequired: boolean;
  children: (disabled: boolean, refreshRequired: boolean) => ReactNode;
  onRefresh: (request: CreateRecipientRequest) => void;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementFile: FileDropzoneAsset
  ) => void;
};

export default function Form(props: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const handleSubmission = handleSubmit((formValues) => {
    const { bankStatementFile, ...bankDetails } = formValues;
    const request = formToCreateRecipientRequest(bankDetails);
    if (props.refreshRequired) {
      props.onRefresh(request);
    } else {
      props.onSubmit(request, bankStatementFile);
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

      {props.children(isSubmitting, props.refreshRequired)}
    </form>
  );
}

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;
