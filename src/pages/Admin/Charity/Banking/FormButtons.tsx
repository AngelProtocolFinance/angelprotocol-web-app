import { LoadText } from "components/registration";

type Props = {
  disabled: boolean;
  isSubmitting: boolean;
  newRequirementsAdded: boolean;
  refreshRequired: boolean;
};

export default function FormButtons({
  disabled,
  isSubmitting,
  newRequirementsAdded,
  refreshRequired,
}: Props) {
  return refreshRequired ? (
    <div className="grid gap-4 mt-8">
      <i className="text-xs sm:text-sm">
        After you fill the form, we may need additional information to be able
        to submit your bank details for validation. Please fill the form and
        click the "Check requirements" button below.
      </i>
      <button
        disabled={disabled || isSubmitting}
        type="submit"
        className="px-6 btn-orange gap-1 text-sm w-80"
      >
        <LoadText isLoading={isSubmitting} text="Checking...">
          Check Requirements
        </LoadText>
      </button>
    </div>
  ) : (
    <div className="grid gap-4">
      <i className="text-xs sm:text-sm">
        {newRequirementsAdded
          ? "Please check the form again and fill in all the newly added fields."
          : "All requirements are met! Please click continue."}
      </i>
      <button
        disabled={disabled || isSubmitting}
        type="submit"
        className="px-6 btn-orange gap-1 text-sm w-80"
      >
        <LoadText isLoading={isSubmitting}>Submit</LoadText>
      </button>
    </div>
  );
}
