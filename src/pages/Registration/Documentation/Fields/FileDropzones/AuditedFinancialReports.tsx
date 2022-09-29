import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import { ErrorMessage } from "pages/Registration/common";
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
      <ErrorMessage<DocumentationValues>
        errors={errors}
        name="auditedFinancialReports"
      />
    </InputRow>
  );
}
