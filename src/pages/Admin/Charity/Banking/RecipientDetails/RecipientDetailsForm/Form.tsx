import { useFormContext } from "react-hook-form";
import { FormValues } from "../types";
import { AccountRequirements, CreateRecipientRequest } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import FileDropzone from "components/FileDropzone";
import LoaderRing from "components/LoaderRing";
import { Label } from "components/form";
import { MB_LIMIT } from "schemas/file";
import RequirementField from "./RequirementField";
import formToCreateRecipientRequest from "./formToCreateRecipientRequest";

type Props = {
  accountRequirements: AccountRequirements;
  disabled: boolean;
  refreshRequired: boolean;
  onRefresh: (request: CreateRecipientRequest) => void;
  onSubmit: (
    request: CreateRecipientRequest,
    bankStatementPDF: FileDropzoneAsset
  ) => void;
};

export default function Form(props: Props) {
  const { handleSubmit } = useFormContext<FormValues>();

  const handleSubmission = handleSubmit((formValues) => {
    const { bankStatementPDF, ...bankDetails } = formValues;
    const request = formToCreateRecipientRequest(bankDetails);
    if (props.refreshRequired) {
      props.onRefresh(request);
    } else {
      props.onSubmit(request, bankStatementPDF);
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
        <FileDropzone<FormValues, "bankStatementPDF">
          name="bankStatementPDF"
          tooltip={fileTooltip}
        />
      </div>

      {props.refreshRequired ? (
        <>
          <span>
            After you fill the form, we may need additional information to be
            able to submit your bank details for validation. Please fill the
            form and click the "Check requirements" button below.
          </span>
          <SubmitButton text="Check Requirements" loadingText="Checking..." />
        </>
      ) : (
        <SubmitButton text="Submit" loadingText="Submitting..." />
      )}
    </form>
  );
}

function SubmitButton(props: { text: string; loadingText: string }) {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="px-6 btn-orange gap-1 text-sm w-80"
    >
      {isSubmitting ? (
        <>
          <LoaderRing
            thickness={10}
            classes={{ container: "w-4", ringToColor: "to-white" }}
          />{" "}
          {props.loadingText}
        </>
      ) : (
        props.text
      )}
    </button>
  );
}

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;
