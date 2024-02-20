import { ReactNode } from "react";
import BackBtn from "../../BackBtn";
import Heading from "./Heading";
import SplitSummary from "./SplitSummary";

type Props = {
  classes?: string;
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
  return (
    <div className={`grid content-start p-4 @md:p-8 ${props.classes ?? ""}`}>
      <BackBtn type="button" onClick={props.onBack} />
      <Heading classes="my-4" />
      {props.preSplitContent}
      <SplitSummary
        classes="mb-4"
        total={<Amount amount={props.amount} classes="text-gray-d2" />}
        liquid={<Amount amount={liq} classes="text-sm" />}
        locked={<Amount amount={locked} classes="text-sm" />}
      />
      {props.children}
    </div>
  );
}
