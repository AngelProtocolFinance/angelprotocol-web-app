import bgIcon from "assets/favicon.png";
import character from "assets/images/waving-character.png";
import Image from "components/Image/Image";
import { TipStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Tip({ details }: TipStep) {
  const dispatch = useSetter();

  const symbol = (() => {
    switch (details.method) {
      case "stripe":
      case "paypal":
        return details.currency.code;
      case "chariot":
        return "usd";
      case "stocks":
        return details.symbol;
      case "crypto":
        return details.token.symbol;
    }
  })();

  return (
    <form className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("splits"))} />
      <h4 className="mt-4 text-lg">
        Choose a Donation for{" "}
        <Image src={bgIcon} className="inline-block size-5" /> Better.giving
      </h4>
      <p className="text-gray-d1">
        We are completely free, and rely on donations
      </p>

      <label className="mb-2 mt-6">Your donation amount</label>
      <div className="field-container grid grid-cols-[1fr_auto] px-4 py-3">
        <input type="text" placeholder="$ Enter amount" />
        <span className="uppercase">{symbol}</span>
      </div>

      <div className="rounded bg-blue-l5 h-[4.5rem] mt-16 relative">
        <Image src={character} className="absolute left-1 bottom-0" />
        <p className="px-[5.32rem] grid place-items-center text-center h-full text-[0.94rem]">
          Thank you for keeping Better giving free for everyone!
        </p>
      </div>

      <p className="text-sm text-gray-d1 mt-6">
        Assist us in advancing our mission to connect with global organizations
        and propagate our timeless message:{" "}
        <span className="font-medium block">Give today, give forever.</span>
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
    </form>
  );
}
