import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Image from "components/Image";
import { IoArrowForwardOutline } from "react-icons/io5"; //icon-arrow-right
import type { Allocation } from "types/aws";

type Props = {
  disabled?: boolean;
  /** cash, liq, lock */
  value: Allocation;
  onChange: (value: Allocation) => void;
};

export type Boundary = [number, number];

const toBoundary = (val: Allocation): Boundary => {
  return [val.cash, 100 - val.lock];
};

const toAlloc = ([b1, b2]: Boundary): Allocation => {
  return {
    cash: b1,
    liq: b2 - b1,
    lock: 100 - b2,
  };
};

export function AllocationSlider({ disabled = false, value, onChange }: Props) {
  const boundary = toBoundary(value);

  return (
    <div className="grid gap-5">
      {/** percentages */}
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 gap-y-2">
        <div className="grid grid-cols-subgrid col-span-full items-center">
          <IoArrowForwardOutline className="text-gray" size={20} />
          <p className="text-sm">Grant</p>
          <p className="text-right">{value.cash}%</p>
        </div>
        <div className="grid grid-cols-subgrid col-span-full items-center">
          <Image src={sendMoney} width={20} />
          <p className="text-sm">Savings</p>
          <p className="text-right">{value.liq}%</p>
        </div>
        <div className="grid grid-cols-subgrid col-span-full items-center">
          <Image src={leaf} className="" />
          <p className="text-sm">Investment</p>
          <p className="text-right">{value.lock}%</p>
        </div>
      </div>

      {/** slider */}
      <Slider.Root
        value={boundary}
        minStepsBetweenThumbs={0}
        onValueChange={(b: Boundary) => onChange(toAlloc(b))}
        className="group/slider relative flex items-center select-none touch-none"
        disabled={disabled}
      >
        <Slider.Track
          style={{
            backgroundImage: `linear-gradient(to right, #F9FBFA 0%, #F9FBFA ${boundary[0]}%, #96C82D ${boundary[0]}%, #96C82D 100%)`,
          }}
          className="shadow-inner group-aria-disabled/slider:bg-[#f5e09d] relative grow rounded-full h-2"
        >
          <Slider.Range className="absolute bg-[#F5C828] group-aria-disabled/slider:bg-[#bdcc9d] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block size-5 rounded-full bg-gray-d1 shadow-md  group-aria-disabled/slider:bg-gray" />
        <Slider.Thumb className="block size-5 rounded-full bg-white shadow-md border border-gray-l4 group-aria-disabled/slider:bg-gray" />
      </Slider.Root>
    </div>
  );
}
