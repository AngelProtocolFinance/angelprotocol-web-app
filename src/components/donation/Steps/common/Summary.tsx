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
  tip?: { value: number; charityName: string };
  Amount: (props: { amount: number | string; classes?: string }) => ReactNode;
  onBack(): void;
  amount: number;
  splitLiq: number;

  children?: ReactNode;
  preSplitContent?: ReactNode;
};
export default function Summary({ Amount, ...props }: Props) {
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
        amount={props.amount}
        splitLiq={props.splitLiq}
        Donation={(n) => <Amount amount={n} classes="text-gray-d2" />}
        Liquid={(n) => <Amount classes="text-sm" amount={n} />}
        Locked={(n) => <Amount classes="text-sm" amount={n} />}
        tip={
          props.tip
            ? {
                charityName: props.tip.charityName,
                value: props.tip.value,
                Tip: (n) => <Amount amount={n} />,
                Total: (n) => <Amount amount={n} />,
              }
            : undefined
        }
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
