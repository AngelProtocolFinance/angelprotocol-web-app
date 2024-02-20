import { ReactNode } from "react";
import Icon from "../../../Icon";
import BackBtn from "./BackBtn";
import SplitSummary from "./SplitSummary";

type Classes =
  | string
  | {
      container?: string;
      split?: string;
    };

type Props = {
  classes?: Classes;
  Amount: (props: { amount: number | string; classes?: string }) => ReactNode;
  onBack(): void;
  amount: number;
  splitLiq: number;

  children?: ReactNode;
  preSplitContent?: ReactNode;
};
export default function Summary({ Amount, ...props }: Props) {
  const liq = props.amount * (props.splitLiq / 100);
  const locked = props.amount - liq;
  const { container, split } = unpack(props.classes);
  return (
    <div className={container}>
      <BackBtn type="button" onClick={props.onBack} />
      <h4 className="flex items-center text-lg gap-2 my-4">
        <Icon type="StickyNote" />
        <span className="font-semibold">Your donation summary</span>
      </h4>
      {props.preSplitContent}
      <SplitSummary
        classes={split}
        total={<Amount amount={props.amount} classes="text-gray-d2" />}
        liquid={<Amount amount={liq} classes="text-sm" />}
        locked={<Amount amount={locked} classes="text-sm" />}
      />
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
