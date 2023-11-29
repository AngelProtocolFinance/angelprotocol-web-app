import { FormButtonsProps } from "components/BankDetails/types";
import { LoadText } from "components/registration";

export default function FormButtons({
  alreadySubmitted = false,
  disabled = false,
  isSubmitting = false,
  newRequirementsAdded = false,
  refreshRequired = false,
}: FormButtonsProps) {
  if (alreadySubmitted) {
    return (
      <i className="mt-8 text-xs sm:text-sm">
        You have already successfully submitted your bank details. Click "Update
        Bank Details" button above to submit new bank details for review.
      </i>
    );
  }

  if (refreshRequired) {
    return (
      <div className="grid gap-4 mt-8">
        <i className="text-xs sm:text-sm">
          After you fill the form, we may need additional information to be able
          to submit your bank details for validation. Please fill the form and
          click the "Check requirements" button below.
        </i>
        <button
          disabled={disabled || isSubmitting}
          type="submit"
          className="px-6 btn-orange gap-1 text-sm w-full md:w-80"
        >
          <LoadText isLoading={isSubmitting} text="Checking...">
            Check Requirements
          </LoadText>
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <i className="text-xs sm:text-sm">
        {newRequirementsAdded
          ? "Please check the form again and fill in all the newly added fields."
          : "All requirements are met! Please click continue."}
      </i>
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
