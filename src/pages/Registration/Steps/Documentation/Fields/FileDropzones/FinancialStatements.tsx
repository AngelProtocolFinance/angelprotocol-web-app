import { useFormContext } from "react-hook-form";
import { DocumentationValues } from "pages/Registration/types";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../../../../common";

export default function FinancialStatements() {
  const {
    formState: { isSubmitting },
  } = useFormContext<DocumentationValues>();

  return (
    <InputRow
      htmlFor="financialStatements"
      label="At least one of the last 2 year’s financial statements"
    >
      <FileDropzone<DocumentationValues, "financialStatements">
        name="financialStatements"
        className="h-8"
        multiple
        disabled={isSubmitting}
      />
    </InputRow>
  );
}
