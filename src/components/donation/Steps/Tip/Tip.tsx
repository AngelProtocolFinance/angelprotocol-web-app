import bgIcon from "assets/favicon.png";
import Image from "components/Image/Image";
import { setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Tip() {
  const dispatch = useSetter();

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("splits"))} />
      <h4 className="mt-4">
        Choose a Donation for <Image src={bgIcon} /> Better.giving
      </h4>

      <p className="text-sm text-gray-d1 mt-6">
        Assist us in advancing our mission to connect with global organizations
        and propagate our timeless message:{" "}
        <span className="font-medium">Give today, give forever.</span>
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
