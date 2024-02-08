import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Image from "components/Image";
import { humanize } from "helpers";
import { useState } from "react";
import { SplitsStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../BackBtn";

export default function Split({
  details,
  kyc,
  liquidSplitPct: persistedLiqSplit = 50,
}: SplitsStep) {
  const dispatch = useSetter();

  //locked(sustainable) is on the left, increasing to the right - slider value represents locked
  const [lockedSplitPct, setLockedSplitPct] = useState(100 - persistedLiqSplit);
  const liqSplitPct = 100 - lockedSplitPct;

  const [amount, symbol] = (() => {
    switch (details.method) {
      case "crypto": {
        const { amount, symbol } = details.token;
        return [amount, symbol];
      }
      case "stocks": {
        const { numShares, symbol } = details;
        return [numShares, symbol];
      }
      default:
        const { amount, currency } = details;
        return [amount, currency.code.toUpperCase()];
    }
  })();

  const liq = +amount * ((100 - lockedSplitPct) / 100);
  //derive locked from liquid to be consistent with checkout
  const locked = +amount - liq;
  const DECIMALS = details.method === "crypto" ? 4 : 2;

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

      {/** percentages */}
      <div className="flex justify-between mt-6 mb-3">
        <div className="grid gap-1 grid-cols-[auto_1fr] items-center">
          <Image src={leaf} className="mr-1" />
          <p className="text-xl">{lockedSplitPct}%</p>
          <p className="uppercase text-xs col-span-full">Sustainable fund</p>
        </div>
        <div className="grid gap-1 grid-cols-[1fr_auto] items-center">
          <p className="text-xl text-right">{liqSplitPct}%</p>
          <Image src={sendMoney} className="ml-1" />
          <p className="uppercase text-xs col-span-full">Instantly Available</p>
        </div>
      </div>

      {/** slider */}
      <Slider.Root
        defaultValue={[lockedSplitPct]}
        value={[lockedSplitPct]}
        onValueChange={([pct]) => setLockedSplitPct(pct)}
        className="relative flex items-center select-none touch-none my-2"
      >
        <Slider.Track className="bg-[#F5C828] relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-[#96C82D] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="flex gap-[2.5px] justify-center items-center w-9 h-5 bg-white border border-[#EAECEB] shadow-lg shadow-black/15 rounded-[6px]">
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
        </Slider.Thumb>
      </Slider.Root>

      {/** amount breakdown */}
      <div className="flex justify-between mt-1">
        <dl>
          <dt className="text-gray-d1 text-xs">Compounded Forever</dt>
          <dd>
            <span className="text-xs font-medium mr-1">{symbol}</span>
            <span>{humanize(locked, DECIMALS)}</span>
          </dd>
        </dl>
        <dl>
          <dt className="text-gray-d1 text-xs">Instantly Available</dt>
          <dd className="text-right">
            <span className="text-xs font-medium mr-1">{symbol}</span>
            <span>{humanize(liq, DECIMALS)}</span>
          </dd>
        </dl>
      </div>

      <p className="text-sm text-gray-d1 mt-6">
        With splitting your donation into sustainable funds, you align
        investments with personal values, improving long-term financial
        performance, reducing risk exposure, and contributing to global
        sustainability goals.
      </p>

      <button
        type="button"
        onClick={() => {
          dispatch(setSplit(liqSplitPct));
        }}
        className="btn-orange btn-donate mt-6"
      >
        Continue
      </button>
    </div>
  );
}
