import { unpack } from "helpers";
import { ListCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { OptionType } from "types/components";
import type { Frequency } from "../types";
import BackBtn from "./back-btn";

type Classes =
  | string
  | {
      container?: string;
      split?: string;
    };

type Props = {
  amount: number;
  tip?: { value: number; charityName: string };
  feeAllowance?: number;

  Amount: (props: { amount: number | string; classes?: string }) => ReactNode;
  onBack(): void;
  frequency?: Frequency;
  classes?: Classes;
  children?: ReactNode;
  preSplitContent?: ReactNode;
  program?: OptionType<string>;
};

export default function Summary({
  Amount,
  frequency = "one-time",
  ...props
}: Props) {
  const { container, split: splitClass } = unpack(props.classes);

  const tipValue = props.tip?.value ?? 0;

  return (
    <div className={container}>
      <BackBtn type="button" onClick={props.onBack} />
      <h4 className="flex items-center text-lg gap-2 my-4">
        <ListCheck size={20} />
        <span className="font-semibold">Your donation summary</span>
      </h4>
      {props.preSplitContent}

      <dl
        className={`text-navy-l1 grid grid-cols-[1fr_auto] items-center justify-between border-y border-gray-l4 divide-y divide-gray-l4 ${splitClass}`}
      >
        {props.program && props.program.value && (
          <p className="text-navy-l1 col-span-full py-2 text-sm">
            Program: {props.program.label}
          </p>
        )}
        <div className="grid grid-cols-[1fr_auto] py-3 gap-y-1">
          <dt aria-label="amount" className="mr-auto text-navy-d4">
            <span>
              {props.tip && tipValue > 0
                ? `Donation for ${props.tip.charityName}`
                : "Total donation"}
            </span>
          </dt>
          <Amount amount={props.amount} classes="text-navy-d4" />
        </div>

        {tipValue > 0 && (
          <div className="col-span-full grid grid-cols-[1fr_auto] py-3">
            <dt className="mr-auto" aria-label="tip">
              Donation for Better Giving
            </dt>
            <Amount classes="text-sm" amount={tipValue} />
          </div>
        )}

        {props.feeAllowance ? (
          <div className="col-span-full grid grid-cols-[1fr_auto] py-3">
            <dt className="mr-auto" aria-label="fee allowance">
              Covered Payment Processing Fees
            </dt>
            <Amount classes="text-sm" amount={props.feeAllowance} />
          </div>
        ) : null}

        <div className="grid col-span-full grid-cols-[1fr_auto] font-medium py-3">
          <dt className="mr-auto text-navy-d4" aria-label="total">
            Total {frequency === "subscription" ? "monthly " : ""}charge
          </dt>
          <Amount
            amount={props.amount + tipValue + (props.feeAllowance ?? 0)}
          />
        </div>
      </dl>

      {props.children}
    </div>
  );
}
