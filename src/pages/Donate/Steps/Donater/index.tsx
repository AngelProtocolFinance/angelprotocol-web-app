import { useSetter } from "store/accessors";
import { Step1, setDetails } from "slices/donation";

export default function Donater(props: Step1) {
  const dispatch = useSetter();

  function goToNextStep() {
    dispatch(setDetails(props.details || { amount: 1, liquidSplit: 0.5 }));
  }

  return (
    <div>
      <div>Donate form</div>
      <div>
        <button onClick={goToNextStep}>next</button>
        <button>go back to profile</button>
      </div>
    </div>
  );
}
