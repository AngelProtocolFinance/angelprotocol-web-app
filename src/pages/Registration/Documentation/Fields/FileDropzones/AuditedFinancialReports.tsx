import { FieldError, useFormContext } from "react-hook-form";
import { DocumentationValues } from "@types-page/registration";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../../../common";

export default function AuditedFinancialReport() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<DocumentationValues>();

  return (
    <InputRow
      htmlFor="auditedFinancialReports"
      label="3rd party audited financial report or published Annual Report"
    >
      <FileDropzone<DocumentationValues>
        name="auditedFinancialReports"
        className="h-8"
        multiple
        disabled={isSubmitting}
      />
      {!!errors.auditedFinancialReports?.length &&
        errors.auditedFinancialReports
          // Yup assumes wrong field names for errors, so we need to cast them first as "any",
          // otherwise it would issue a warning
          .map((fieldError: any) => (fieldError as FieldError).message)
          .filter(checkUnique)
          .map((message) => (
            <p
              key={message}
              className="w-full text-xs text-failed-red text-center"
            >
              {message}
            </p>
          ))}
    </InputRow>
  );
}

// Checks, if the given value is the first occurring. If not, it must be a duplicate.
function checkUnique(
  value: string | undefined,
  index: number,
  self: (string | undefined)[]
) {
  return self.indexOf(value) === index;
}
