import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import FileDropzone from "components/FileDropzone";
import { InputRow } from "../../../../common";

export default function FinancialStatements() {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      htmlFor="financialStatements"
      label="At least one of the last 2 year’s financial statements"
    >
      <FileDropzone<FormValues, "financialStatements">
        name="financialStatements"
        className="h-8"
        multiple
        disabled={isSubmitting}
      />
    </InputRow>
  );
}
