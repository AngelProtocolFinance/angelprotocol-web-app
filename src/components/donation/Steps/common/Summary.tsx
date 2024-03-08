import { ReactNode } from "react";
import Icon from "../../../Icon";
import BackBtn from "./BackBtn";

type Classes =
  | string
  | {
      container?: string;
      split?: string;
    };

type Props = {
  amount: number;
  splitLiq: number;
  tip?: { value: number; charityName: string };

  Amount: (props: { amount: number | string; classes?: string }) => ReactNode;
  onBack(): void;
  frequency?: "once" | "monthly";
  classes?: Classes;
  children?: ReactNode;
  preSplitContent?: ReactNode;
};

export default function Summary({
  Amount,
  frequency = "once",
  ...props
}: Props) {
  const { container, split: splitClass } = unpack(props.classes);
  const liq = props.amount * (props.splitLiq / 100);
  const locked = props.amount - liq;

  return (
    <div className={container}>
      <BackBtn type="button" onClick={props.onBack} />
      <h4 className="flex items-center text-lg gap-2 my-4">
        <Icon type="StickyNote" />
        <span className="font-semibold">Your donation summary</span>
      </h4>
      {props.preSplitContent}

      <dl
        className={`text-navy-l1 py-3 gap-y-2 grid grid-cols-[1fr_auto] items-center justify-between border-y border-gray-l4 ${splitClass}`}
      >
        <dt className="mr-auto text-navy-d4">
          {props.tip
            ? `Donation for ${props.tip.charityName}`
            : "Total donation"}
        </dt>
        <Amount amount={props.amount} classes="text-navy-d4" />
        <div className="flex items-center justify-between col-span-full">
          <dt className="mr-auto text-sm">Sustainable Fund</dt>
          <Amount classes="text-sm" amount={locked} />
        </div>
        <div className="flex items-center justify-between col-span-full">
          <dt className="mr-auto text-sm">Instantly Available</dt>
          <Amount classes="text-sm" amount={liq} />
        </div>
        {props.tip && (
          <div className="col-span-full grid grid-cols-[1fr_auto] border-y border-gray-l4 py-3">
            <dt className="mr-auto">Donation for Better.giving</dt>
            <Amount classes="text-sm" amount={props.tip.value} />
          </div>
        )}
        {props.tip && (
          <div className="col-span-full grid grid-cols-[1fr_auto] pt-1 font-medium">
            <dt className="mr-auto text-navy-d4">
              Total {frequency === "monthly" ? "monthly " : ""}charge
            </dt>
            <Amount amount={props.amount + props.tip.value} />
          </div>
        )}
      </dl>

      {props.children}
    </div>
  );
}

export function unpack(classes?: Classes) {
  const _classes: Classes =
    typeof classes === "string" ? { container: classes } : classes || {};

  const { container = "", split = "" } = _classes;
  return { container, split };
}
