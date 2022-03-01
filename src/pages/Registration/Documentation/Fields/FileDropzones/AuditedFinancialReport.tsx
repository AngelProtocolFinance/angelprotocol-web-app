import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import InputRow from "../InputRow";

export default function AuditedFinancialReport() {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="auditedFinancialReport"
      label="3rd party audited financial report or published Annual Report"
    >
      <FileDropzone name="auditedFinancialReport" className="h-8" multiple />
      {!!errors.auditedFinancialReport?.length &&
        errors.auditedFinancialReport.map((fieldError) => (
          <p
            key={fieldError.message}
            className="w-full text-xs text-failed-red text-center"
          >
            {fieldError.message}
          </p>
        ))}
    </InputRow>
  );
}
