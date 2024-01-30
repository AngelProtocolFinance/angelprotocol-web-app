import { setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Stocks() {
  const dispatch = useSetter();
  return (
    <div className="grid content-start gap-8 p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("donate-form"))} />
    </div>
  );
}
