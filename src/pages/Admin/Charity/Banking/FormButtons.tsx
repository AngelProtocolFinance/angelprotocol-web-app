import { LoadText } from "components/registration";

type Props = {
  disabled: boolean;
  isSubmitting: boolean;
  refreshRequired: boolean;
};

export default function FormButtons({
  disabled,
  isSubmitting,
  refreshRequired,
}: Props) {
  return refreshRequired ? (
    <>
      <span>
        After you fill the form, we may need additional information to be able
        to submit your bank details for validation. Please fill the form and
        click the "Check requirements" button below.
      </span>
      <button
        disabled={disabled || isSubmitting}
        type="submit"
        className="px-6 btn-orange gap-1 text-sm w-80"
      >
        <LoadText isLoading={isSubmitting} text="Checking...">
          Check Requirements
        </LoadText>
      </button>
    </>
  ) : (
    <button
      disabled={disabled || isSubmitting}
      type="submit"
      className="px-6 btn-orange gap-1 text-sm w-80"
    >
      <LoadText isLoading={isSubmitting}>Submit</LoadText>
    </button>
  );
}
