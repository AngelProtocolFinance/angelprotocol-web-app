import { TipStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Tip({ kyc }: TipStep) {
  const dispatch = useSetter();

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn
        type="button"
        onClick={() => dispatch(setStep(kyc ? "kyc-form" : "donate-form"))}
      />
      <h4 className="mt-4">Split donation</h4>
      <p className="text-gray-d1">
        Create a sustainable impact by dividing funds
      </p>

      <p className="text-sm text-gray-d1 mt-6">
        With splitting your donation into sustainable funds, you align
        investments with personal values, improving long-term financial
        performance, reducing risk exposure, and contributing to global
        sustainability goals.
      </p>

      <button
        type="button"
        onClick={() => {
          dispatch(setSplit(50));
        }}
        className="btn-orange btn-donate mt-6"
      >
        Continue
      </button>
    </div>
  );
}
