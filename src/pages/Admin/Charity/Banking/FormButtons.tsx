import { FormButtonsProps } from "components/BankDetails/types";
import LoadText from "components/LoadText";

export default function FormButtons({
  disabled = false,
  isSubmitting = false,
}: FormButtonsProps) {
  return (
    <div className="grid gap-4">
      <button
        disabled={disabled || isSubmitting}
        type="submit"
        className="px-6 btn-orange gap-1 text-sm w-full md:w-80"
      >
        <LoadText isLoading={isSubmitting}>Submit</LoadText>
      </button>
    </div>
  );
}
