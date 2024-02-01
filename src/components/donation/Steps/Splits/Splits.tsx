import { SplitsStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Split(props: SplitsStep) {
  const dispatch = useSetter();
  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn
        type="button"
        onClick={() =>
          dispatch(setStep(props.kyc ? "kyc-form" : "donate-form"))
        }
      />
      <button
        type="button"
        onClick={() => {
          dispatch(setSplit(props.liquidSplitPct || 50));
        }}
      >
        split
      </button>
    </div>
  );
}
