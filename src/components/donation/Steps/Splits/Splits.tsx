import { SplitsStep, setSplit } from "slices/donation";
import { useSetter } from "store/accessors";

export default function Split(props: SplitsStep) {
  const dispatch = useSetter();
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(setSplit(props.liquidSplitPct || 50));
      }}
    >
      split
    </button>
  );
}
