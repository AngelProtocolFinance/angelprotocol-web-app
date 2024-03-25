import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Image from "components/Image";

type Props = {
  disabled?: boolean;
  value: number;
  onChange: (value: number) => void;
};

export function LockedSplitSlider({
  disabled = false,
  value,
  onChange,
}: Props) {
  return (
    <div className="grid gap-5">
      {/** percentages */}
      <div className="flex justify-between">
        <div className="grid gap-1 grid-cols-[auto_1fr] items-center">
          <Image src={leaf} className="mr-1" />
          <p className="text-xl">{value}%</p>
          <p className="uppercase text-xs col-span-full">Sustainable fund</p>
        </div>
        <div className="grid gap-1 grid-cols-[1fr_auto] items-center">
          <p className="text-xl text-right">{100 - value}%</p>
          <Image src={sendMoney} className="ml-1" />
          <p className="uppercase text-xs col-span-full">Instantly Available</p>
        </div>
      </div>

      {/** slider */}
      <Slider.Root
        value={[value]}
        //locked(sustainable) is on the left, increasing to the right - slider value represents locked
        onValueChange={([pct]) => onChange(pct)}
        className="group/slider relative flex items-center select-none touch-none"
        disabled={disabled}
      >
        <Slider.Track
          className={`bg-[#F5C828] group-aria-disabled/slider:bg-[#f5e09d] relative grow rounded-full h-1.5`}
        >
          <Slider.Range className="absolute bg-[#96C82D] group-aria-disabled/slider:bg-[#bdcc9d] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="flex gap-[2.5px] justify-center items-center w-9 h-5 bg-white border border-[#EAECEB] group-aria-disabled/slider:border-[#EAECEB]/75 shadow-lg shadow-black/15 group-aria-disabled/slider:shadow-black/5 rounded-[6px]">
          <span className="w-px h-2.5 bg-[#D9D9D9] group-aria-disabled/slider:bg-[#D9D9D9]/75" />
          <span className="w-px h-2.5 bg-[#D9D9D9] group-aria-disabled/slider:bg-[#D9D9D9]/75" />
          <span className="w-px h-2.5 bg-[#D9D9D9] group-aria-disabled/slider:bg-[#D9D9D9]/75" />
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
}
