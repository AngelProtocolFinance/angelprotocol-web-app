import { useSetter } from "store/accessors";
import { Step2, setKYC, setStep } from "slices/donation";

export default function KYC(props: Step2) {
  const dispatch = useSetter();

  function goToNextStep() {
    dispatch(setKYC(props.kyc || { name: "hello world" }));
  }

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  return (
    <div>
      <div>KYC Form</div>
      <div>
        <button onClick={goToNextStep}>next</button>
        <button onClick={goBack}>back to donater</button>
      </div>
    </div>
  );
}
