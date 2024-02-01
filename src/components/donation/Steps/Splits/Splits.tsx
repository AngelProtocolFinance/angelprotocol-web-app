import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Image from "components/Image";
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
      <h4 className="mt-4">Split donation</h4>
      <p className="text-gray-d1">
        Create a sustainable impact by dividing funds
      </p>

      <div className="flex justify-between mt-6 mb-3">
        <div className="grid gap-1 grid-cols-[auto_1fr] items-center">
          <Image src={leaf} className="mr-1" />
          <p className="text-xl">44%</p>
          <p className="uppercase text-xs col-span-full">Sustainable fund</p>
        </div>
        <div className="grid gap-1 grid-cols-[1fr_auto] items-center">
          <p className="text-xl text-right">56%</p>
          <Image src={sendMoney} className="ml-1" />
          <p className="uppercase text-xs col-span-full">Sustainable fund</p>
        </div>
      </div>
      <Slider.Root className="relative flex items-center select-none touch-none my-2">
        <Slider.Track className="bg-[#F5C828] relative grow rounded-full h-1.5">
          <Slider.Range className="absolute bg-[#96C82D] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="flex gap-[2.5px] justify-center items-center w-9 h-5 bg-white border border-[#EAECEB] shadow-lg shadow-black/15 rounded-[6px]">
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
          <span className="w-px h-2.5 bg-[#D9D9D9]" />
        </Slider.Thumb>
      </Slider.Root>
      {/* <button
        type="button"
        onClick={() => {
          dispatch(setSplit(props.liquidSplitPct || 50));
        }}
      >
        split
      </button> */}
      <p className="text-sm text-gray-d1 mt-6">
        With splitting your donation into sustainable funds, you align
        investments with personal values, improving long-term financial
        performance, reducing risk exposure, and contributing to global
        sustainability goals.
      </p>
    </div>
  );
}
