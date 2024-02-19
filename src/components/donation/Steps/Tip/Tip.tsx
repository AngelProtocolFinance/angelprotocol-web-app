import * as Slider from "@radix-ui/react-slider";
import bgIcon from "assets/favicon.png";
import character from "assets/images/waving-character.png";
import Image from "components/Image/Image";
import { humanize } from "helpers";
import { useState } from "react";
import { TipStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

type TipObj = {
  amount: number;
  pct: number;
};
const DEFAULT_PCT = 17;

export default function Tip({ details }: TipStep) {
  const dispatch = useSetter();

  const [symbol, amount, decimals = 2] = (() => {
    switch (details.method) {
      case "stripe":
      case "paypal":
        return [details.currency.code, +details.amount];
      case "chariot":
        return ["usd", +details.amount];
      case "stocks":
        return [details.symbol, details.numShares];
      case "crypto":
        return [details.token.symbol, +details.token.amount, 4];
    }
  })();

  const [tip, setTip] = useState<TipObj>({
    amount: amount * (DEFAULT_PCT / 100),
    pct: DEFAULT_PCT,
  });

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

      <Slider.Root
        step={1}
        value={[tip.pct]}
        onValueChange={([pct]) => setTip({ amount: amount * (pct / 100), pct })}
        className="relative flex items-center select-none touch-none mt-16"
      >
        <Slider.Track className="relative grow rounded-full h-1.5 bg-[#EAECEB]">
          <Slider.Range className="absolute bg-blue-d1 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="flex gap-[2.5px] justify-center items-center w-9 h-5 bg-white border border-[#EAECEB] shadow-lg shadow-black/15 rounded-[6px] relative">
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <div className="absolute -top-9 px-2 py-0.5 rounded text-sm">
            <span className="text-xs uppercase mr-0.5">{symbol}</span>
            <span className="mr-0.5">{humanize(tip.amount, decimals)}</span>
            <span className="text-gray-d1 text-xs">({tip.pct}%)</span>
          </div>
        </Slider.Thumb>
      </Slider.Root>

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
