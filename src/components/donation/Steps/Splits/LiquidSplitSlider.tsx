import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Image from "components/Image";

type Props = {
  disabled?: boolean;
  liquidSplitPct: number;
  setLiquidSplitPct: (value: number) => void;
};

export default function LiquidSplitSlider({
  disabled = false,
  liquidSplitPct,
  setLiquidSplitPct,
}: Props) {
  const lockedSplitPct = 100 - liquidSplitPct;

  return (
    <div className="grid gap-5">
      {/** percentages */}
      <div className="flex justify-between">
        <div className="grid gap-1 grid-cols-[1fr_auto] items-center">
          <p className="text-xl text-right">{liquidSplitPct}%</p>
          <Image src={sendMoney} className="ml-1" />
          <p className="uppercase text-xs col-span-full">Instantly Available</p>
        </div>
        <div className="grid gap-1 grid-cols-[auto_1fr] items-center">
          <Image src={leaf} className="mr-1" />
          <p className="text-xl">{lockedSplitPct}%</p>
          <p className="uppercase text-xs col-span-full">Sustainable fund</p>
        </div>
      </div>

      {/** slider */}
      <Slider.Root
        value={[lockedSplitPct]}
        //locked(sustainable) is on the left, increasing to the right - slider value represents locked
        onValueChange={([pct]) => setLiquidSplitPct(100 - pct)}
        className="relative flex items-center select-none touch-none"
        disabled={disabled}
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
    </div>
  );
}
