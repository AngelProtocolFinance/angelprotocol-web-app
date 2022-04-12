import FileDropzone from "components/FileDropzone";
import { FieldError, useFormContext } from "react-hook-form";
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
