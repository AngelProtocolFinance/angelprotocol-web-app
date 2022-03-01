import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../../types";
import InputRow from "../InputRow";

export default function FinancialStatements() {
  const {
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      id="financialStatements"
      label="At least one of the last 2 year’s financial statements"
    >
      <FileDropzone name="financialStatements" className="h-8" multiple />
      {!!errors.financialStatements?.length &&
        errors.financialStatements.map((fieldError) => (
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
