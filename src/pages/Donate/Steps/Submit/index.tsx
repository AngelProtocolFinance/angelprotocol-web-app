import { useSetter } from "store/accessors";
import { Step3, setStep } from "slices/donation";

export default function Submit(props: Step3) {
  const dispatch = useSetter();

  function goBack() {
    dispatch(setStep(props.step - 1));
  }
  return (
    <div>
      <div>SUBMIT UI</div>
      <div>
        <button>submit data</button>
        <button onClick={goBack}>back to kyc form</button>
      </div>
    </div>
  );
}
