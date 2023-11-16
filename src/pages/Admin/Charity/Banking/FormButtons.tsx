import { LoadText } from "components/registration";

export default function FormButtons({
  disabled,
  refreshRequired,
}: {
  disabled: boolean;
  refreshRequired: boolean;
}) {
  return refreshRequired ? (
    <>
      <span>
        After you fill the form, we may need additional information to be able
        to submit your bank details for validation. Please fill the form and
        click the "Check requirements" button below.
      </span>
      <button
        disabled={disabled}
        type="submit"
        className="px-6 btn-orange gap-1 text-sm w-80"
      >
        <LoadText isLoading={disabled} text="Checking...">
          Check Requirements
        </LoadText>
      </button>
    </>
  ) : (
    <button
      disabled={disabled}
      type="submit"
      className="px-6 btn-orange gap-1 text-sm w-80"
    >
      <LoadText isLoading={disabled} text="Submitting...">
        Submit
      </LoadText>
    </button>
  );
}
