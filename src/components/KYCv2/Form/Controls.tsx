import { useFormContext } from "react-hook-form";
import { FormValues, Props } from "../types";
import { useSetter } from "store/accessors";
import { setKYC, setStep } from "slices/donation";

export default function Controls(props: Props) {
  const {
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext<FormValues>();
  const dispatch = useSetter();

  if (props.type === "post-donation") {
    return (
      <button
        disabled={!isDirty || !isValid || !isSubmitting}
        className="btn-orange"
        type="submit"
      >
        {isSubmitting ? "Processing..." : "Submit"}
      </button>
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
    <div className="grid cols-span-2 col-span-2">
      <button
        onClick={goBack}
        className="text-sm md:text-base py-3 rounded border border-gray-l2 dark:border-bluegray-d1 bg-orange-l5 dark:bg-blue-d5 text-center hover:bg-orange-l4 dark:hover:bg-blue-d3"
        type="button"
      >
        Back
      </button>
      {isKYCRequired ? (
        <button disabled={cantSubmit} className="btn-orange" type="submit">
          Continue
        </button>
      ) : (
        <button className="btn-orange" type="button" onClick={skip}>
          Skip
        </button>
      )}
    </div>
  );
}
