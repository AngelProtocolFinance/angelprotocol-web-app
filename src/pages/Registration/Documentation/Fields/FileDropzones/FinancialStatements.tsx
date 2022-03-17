import FileDropzone from "components/FileDropzone";
import { useFormContext } from "react-hook-form";
import { InputRow } from "../../../common";
import { FormValues } from "../../types";

export default function FinancialStatements() {
  const {
    formState: { errors, isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <InputRow
      htmlFor="financialStatements"
      label="At least one of the last 2 year’s financial statements"
    >
      <FileDropzone<FormValues>
        name="financialStatements"
        className="h-8"
        multiple
        disabled={isSubmitting}
      />
      {!!errors.financialStatements?.length &&
        errors.financialStatements
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
