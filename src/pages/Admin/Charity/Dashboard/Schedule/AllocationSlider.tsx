import * as Slider from "@radix-ui/react-slider";
import leaf from "assets/icons/leaf.png";
import sendMoney from "assets/icons/send-money.png";
import Icon from "components/Icon";
import Image from "components/Image";
import { humanize } from "helpers";
import type { ReactNode } from "react";
import type { Allocation } from "types/aws";

interface Props {
  amount: number;
  disabled?: boolean;
  /** cash, liq, lock */
  value: Allocation;
  onChange: (value: Allocation) => void;
}

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

export function AllocationSlider({
  disabled = false,
  value,
  onChange,
  amount,
}: Props) {
  const boundary = toBoundary(value);

  return (
    <div className="grid">
      {/** percentages */}
      <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-4 gap-y-2">
        <Row
          title="Grant"
          icon={<Icon type="ArrowRight" className="text-gray" size={20} />}
          pct={value.cash}
          amount={amount}
        />
        <Row
          title="Savings"
          icon={<Image src={sendMoney} width={20} />}
          pct={value.liq}
          amount={amount}
        />
        <Row
          title="Investment"
          icon={<Image src={leaf} className="" />}
          pct={value.lock}
          amount={amount}
        />
      </div>

      {/** slider */}
      <Slider.Root
        value={boundary}
        minStepsBetweenThumbs={0}
        onValueChange={(b: Boundary) => onChange(toAlloc(b))}
        className="group/slider relative flex items-center select-none touch-none mt-5"
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

interface IRow {
  title: string;
  icon: ReactNode;
  pct: number;
  amount: number;
}
function num(amount: number, pct: number) {
  return humanize(amount * (pct / 100));
}
function Row(props: IRow) {
  return (
    <div className="grid grid-cols-subgrid col-span-full items-center">
      {props.icon}
      <p className="text-sm">{props.title}</p>
      <p className="text-gray text-xs text-right">{props.pct}%</p>
      <p className="text-sm text-right">$ {num(props.amount, props.pct)}</p>
    </div>
  );
}
