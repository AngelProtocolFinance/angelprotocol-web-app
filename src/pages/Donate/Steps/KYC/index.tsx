import { useSetter } from "store/accessors";
import { Step2, setStep } from "slices/donation";

export default function KYC(props: Step2) {
  const dispatch = useSetter();

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  return (
    <div>
      <div>KYC Form</div>
      <div>
        <button onClick={goBack}>back to donater</button>
      </div>
    </div>
  );
}
