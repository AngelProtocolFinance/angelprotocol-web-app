import { useFormContext } from "react-hook-form";
import { FormValues, OnDonation } from "../types";
import { BtnBack, ButtonContinue } from "components/donation";
import { useSetter } from "store/accessors";
import { KYC, setKYC, setStep } from "slices/donation";

export default function Controls({
  classes = "",
  ...props
}: OnDonation & { classes?: string }) {
  const {
    watch,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FormValues>();
  const { hasAgreedToTerms, ...formVal } = watch();

  const dispatch = useSetter();

  const { state } = props;
  const {
    step,
    kyc,
    recipient: { isKYCRequired },
  } = state;

  function goBack() {
    dispatch(setStep(step - 1));
  }
  function skip() {
    dispatch(setKYC("skipped"));
  }

  const wasCompleted = !!kyc;
  const cantSubmit =
    isSubmitting || !isValid || (wasCompleted ? false : !isDirty);

  return (
    <div className={`${classes} grid grid-cols-2 gap-5`}>
      <BtnBack as="btn" onClick={goBack} type="button">
        Back
      </BtnBack>
      {/** KYC may not be required, and user may skip KYC,
       * but if user want to submit KYC - it should be validated */}
      {isKYCRequired || hasStartedKYC(formVal || {}) ? (
        <ButtonContinue disabled={cantSubmit} type="submit">
          Continue
        </ButtonContinue>
      ) : (
        <ButtonContinue
          disabled={!hasAgreedToTerms}
          type="button"
          onClick={skip}
        >
          Continue
        </ButtonContinue>
      )}
    </div>
  );
}

function hasStartedKYC({
  name,
  address,
  city,
  postalCode,
  country,
  state,
  email,
}: Omit<KYC, "hasAgreedToTerms">) {
  return [
    name?.first,
    name?.last,
    address?.street,
    address?.complement,
    city,
    postalCode,
    country,
    state,
    email,
  ].some((val) => val);
}
