import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import InputRow from "../InputRow";

export default function AuditedFinancialReport() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="auditedFinancialReports"
      label="3rd party audited financial report or published Annual Report"
    >
      <FileDropzone
        name="auditedFinancialReports"
        className="h-8"
        multiple
        disabled={isSubmitting}
      />
      {!!errors.auditedFinancialReports?.length &&
        errors.auditedFinancialReports
          .map((fieldError) => fieldError.message)
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
