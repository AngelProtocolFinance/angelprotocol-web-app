import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../../../../common";

export default function AuditedFinancialReport() {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      htmlFor="auditedFinancialReports"
      label="3rd party audited financial report or published Annual Report"
    >
      <FileDropzone<FormValues, "auditedFinancialReports">
        name="auditedFinancialReports"
        className="h-8"
        multiple
        disabled={isSubmitting}
      />
    </InputRow>
  );
}
