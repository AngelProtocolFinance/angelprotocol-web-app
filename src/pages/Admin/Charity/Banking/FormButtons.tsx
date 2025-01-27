import LoadText from "components/LoadText";
import type { FormButtonsProps } from "components/bank-details/types";

export default function FormButtons({
  disabled = false,
  isSubmitting = false,
}: FormButtonsProps) {
  return (
    <div className="grid gap-4">
      <button
        disabled={disabled || isSubmitting}
        type="submit"
        className="px-6 btn-blue gap-1 text-sm w-full md:w-80"
      >
        <LoadText isLoading={isSubmitting}>Submit</LoadText>
      </button>
    </div>
  );
}
