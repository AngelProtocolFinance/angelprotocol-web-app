import { ComponentType, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { FormButtonsProps } from "components/BankDetails/types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import FileDropzone from "components/FileDropzone";
import { Label } from "components/form";
import RequirementField from "./RequirementField";
import { MB_LIMIT, VALID_MIME_TYPES } from "./constants";
import formToCreateRecipientRequest from "./formToCreateRecipientRequest";

type Props = {
  accountRequirements: AccountRequirements;
  currency: string;
  disabled: boolean;
  refreshedRequirementsAdded: boolean;
  refreshRequired: boolean;
  FormButtons: ComponentType<FormButtonsProps>;
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

  const form = useRef<HTMLFormElement>(null);

  const handleSubmission = handleSubmit(async (formValues) => {
    const { bankStatementFile, ...bankDetails } = formValues;
    const request = formToCreateRecipientRequest(bankDetails);
    if (props.refreshRequired) {
      await props.onRefresh(request);
    } else {
      await props.onSubmit(request, bankStatementFile, isDirty);
    }
  });

  // this should run only when new requirement fields are added
  // manually requesting a form submission will run the validation logic
  // and immediately validate all the newly added fields, clearly marking all the
  // invalid ones to make it easier for the user to notice them
  useEffect(() => {
    if (props.refreshedRequirementsAdded && form.current) {
      form.current.requestSubmit();
    }
  }, [props.refreshedRequirementsAdded]);

  return (
    <form onSubmit={handleSubmission} ref={form} className="grid gap-6">
      {props.accountRequirements.fields
        .flatMap((field) => field.group)
        .map((requirements) => (
          <RequirementField
            key={requirements.key}
            currency={props.currency}
            data={requirements}
            disabled={props.disabled}
            requirementsType={props.accountRequirements.type}
          />
        ))}

      <div className="field">
        <Label required>Please provide your Bank Statement</Label>
        <FileDropzone<FormValues, "bankStatementFile">
          name="bankStatementFile"
          specs={{ mbLimit: MB_LIMIT, mimeTypes: VALID_MIME_TYPES }}
          disabled={props.disabled}
        />
      </div>

      <props.FormButtons
        disabled={props.disabled}
        isSubmitting={isSubmitting}
        refreshedRequirementsAdded={props.refreshedRequirementsAdded}
        refreshRequired={props.refreshRequired}
      />
    </form>
  );
}
