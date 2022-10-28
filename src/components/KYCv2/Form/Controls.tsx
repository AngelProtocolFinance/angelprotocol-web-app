import { useEffect } from "react";
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
    reset,
    trigger,
    watch,
    formState: { isSubmitting },
  } = useFormContext<FormValues>();
  const { hasAgreedToTerms, ...formVal } = watch();

  const wantsKYC = hasStartedKYC(formVal || {});

  useEffect(() => {
    if (!wantsKYC) {
      reset({}, { keepValues: true });
    }
  }, [wantsKYC, reset]);

  const dispatch = useSetter();

  const { state } = props;
  const {
    step,
    recipient: { isKYCRequired },
  } = state;

  function goBack() {
    dispatch(setStep(step - 1));
  }
  async function skip() {
    const isValid = await trigger("hasAgreedToTerms", { shouldFocus: true });
    isValid && dispatch(setKYC("skipped"));
  }

  return (
    <div className={`${classes} grid grid-cols-2 gap-5`}>
      <BtnBack as="btn" onClick={goBack} type="button">
        Back
      </BtnBack>
      {/** KYC may not be required, and user may skip KYC,
       * but if user want to submit KYC - it should be validated */}
      {isKYCRequired || wantsKYC ? (
        <ButtonContinue disabled={isSubmitting} type="submit">
          Continue
        </ButtonContinue>
      ) : (
        <ButtonContinue type="button" onClick={skip}>
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
