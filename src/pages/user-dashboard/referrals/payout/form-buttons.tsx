import type { FormButtonsProps } from "components/bank-details/types";
import { LoadText } from "components/load-text";

export function FormButtons({
  disabled = false,
  isSubmitting = false,
}: FormButtonsProps) {
  return (
    <div className="grid gap-4">
      <button
        disabled={disabled || isSubmitting}
        type="submit"
        className="px-6 btn btn-blue gap-1 text-sm w-full md:w-80"
      >
        <LoadText is_loading={isSubmitting}>Submit</LoadText>
      </button>
    </div>
  );
}
