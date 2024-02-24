import { ReactNode } from "react";

type Amount = (amount: number) => ReactNode;

type Tip = {
  value: number;
  Tip: Amount;
  Total: Amount;
  charityName: string;
};

type Props = {
  amount: number;
  splitLiq: number;
  tip?: Tip;

  Donation: Amount;
  Locked: Amount;
  Liquid: Amount;
  classes?: string;
};

export default function SplitSummary(props: Props) {
  const liq = props.amount * (props.splitLiq / 100);
  const locked = props.amount - liq;
  return (
    <dl
      className={`text-gray-d1 py-3 gap-y-2 grid grid-cols-[1fr_auto] items-center justify-between border-y border-prim ${
        props.classes ?? ""
      }`}
    >
      <dt className="mr-auto text-gray-d2">
        {props.tip ? `Donation for ${props.tip.charityName}` : "Total donation"}
      </dt>
      {props.Donation(props.amount)}
      <div className="flex items-center justify-between col-span-full">
        <dt className="mr-auto text-sm">Sustainable Fund</dt>
        {props.Locked(locked)}
      </div>
      <div className="flex items-center justify-between col-span-full">
        <dt className="mr-auto text-sm">Instantly Available</dt>
        {props.Liquid(liq)}
      </div>
      {props.tip && (
        <div className="col-span-full grid grid-cols-[1fr_auto] border-y border-prim py-3">
          <dt className="mr-auto">Donation for Better.giving</dt>
          {props.tip.Tip(props.tip.value)}
        </div>
      )}
      {props.tip && (
        <div className="col-span-full grid grid-cols-[1fr_auto] pt-1 font-medium">
          <dt className="mr-auto text-gray-d2">Total charge</dt>
          {props.tip.Total(props.amount + props.tip.value)}
        </div>
      )}
    </dl>
  );
}
