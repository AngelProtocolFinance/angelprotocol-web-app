import { useFormContext } from "react-hook-form";
import { FormValues, Props } from "../types";
import { BtnBack, ButtonContinue } from "components/donation";
import { useSetter } from "store/accessors";
import { setKYC, setStep } from "slices/donation";

export default function Controls({ classes = "", ...props }: Props) {
  const {
    watch,
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FormValues>();
  const hasAgreedToTerms = watch("hasAgreedToTerms");
  const dispatch = useSetter();

  if (props.type === "post-donation") {
    return (
      <ButtonContinue
        className={classes}
        disabled={!isDirty || !isValid || !isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Processing..." : "Submit"}
      </ButtonContinue>
    );
  }

  const {
    step,
    kyc,
    recipient: { isKYCRequired },
  } = props.state;

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
      {isKYCRequired ? (
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
