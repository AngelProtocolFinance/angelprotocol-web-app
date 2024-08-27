import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Image from "components/Image";
import type { Allocation } from "types/aws";

type Props = {
  disabled?: boolean;
  /** cash, liq, lock */
  value: Allocation;
  onChange: (value: Allocation) => void;
};

type Boundary = [number, number];

const toBoundary = (val: Allocation): Boundary => {
  return [val.cash, val.lock];
};

const toAlloc = ([b1, b2]: Boundary): Allocation => {
  return {
    cash: b1,
    liq: b2 - b1,
    lock: 100 - b2,
  };
};

export function SplitSlider({ disabled = false, value, onChange }: Props) {
  const boundary = toBoundary(value);

  return (
    <div className="grid gap-5">
      {/** percentages */}
      <div className="flex justify-between">
        <div className="grid gap-1 grid-cols-[1fr_auto] items-center">
          <p className="text-xl text-right">{value.cash}%</p>
          <Image src={sendMoney} className="ml-1" />
          <p className="uppercase text-xs col-span-full">Direct Donation</p>
        </div>
        <div className="grid gap-1 grid-cols-[auto_1fr] items-center">
          <Image src={leaf} className="mr-1" />
          <p className="text-xl">{value.liq}%</p>
          <p className="uppercase text-xs col-span-full">Sustainability Fund</p>
        </div>
      </div>

      {/** slider */}
      <Slider.Root
        value={boundary}
        onValueChange={(b: Boundary) => onChange(toAlloc(b))}
        className="group/slider relative flex items-center select-none touch-none"
        disabled={disabled}
      >
        <Slider.Track
          className={`bg-[#F5C828] group-aria-disabled/slider:bg-[#f5e09d] relative grow rounded-full h-1.5`}
        >
          <Slider.Range className="absolute bg-[#96C82D] group-aria-disabled/slider:bg-[#bdcc9d] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-2 h-6 bg-white border border-gray-l4 group-aria-disabled/slider:bg-gray" />
        <Slider.Thumb className="block w-2 h-6 bg-white border border-gray-l4 group-aria-disabled/slider:bg-gray" />
      </Slider.Root>
    </div>
  );
}
