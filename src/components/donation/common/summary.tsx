import type { TFrequency } from "@better-giving/donation";
import { unpack } from "helpers/unpack";
import { ListCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { OptionType } from "types/components";
import { BackBtn } from "./back-btn";

type Classes =
  | string
  | {
      container?: string;
      split?: string;
    };

type Props = {
  amount: number;
  tip?: { value: number; charity_name: string };
  fee_allowance?: number;

  Amount: (props: { amount: number | string; classes?: string }) => ReactNode;
  on_back(): void;
  frequency?: TFrequency;
  classes?: Classes;
  children?: ReactNode;
  pre_split_content?: ReactNode;
  program?: OptionType<string>;
};

export function Summary({ Amount, frequency = "one-time", ...props }: Props) {
  const { container, split: splitClass } = unpack(props.classes);

  const tipValue = props.tip?.value ?? 0;

  return (
    <div className={container}>
      <BackBtn type="button" onClick={props.on_back} />
      <h4 className="flex items-center text-lg gap-2 my-4">
        <ListCheck size={20} />
        <span className="font-semibold">Your donation summary</span>
      </h4>
      {props.pre_split_content}

      <dl
        className={`text-gray grid grid-cols-[1fr_auto] items-center justify-between border-y border-gray-l3 divide-y divide-gray-l3 ${splitClass}`}
      >
        {props.program && props.program.value && (
          <p className="text-gray col-span-full py-2 text-sm">
            Program: {props.program.label}
          </p>
        )}
        <div className="grid grid-cols-[1fr_auto] py-3 gap-y-1">
          <dt aria-label="amount" className="mr-auto text-gray-d4">
            <span>
              {props.tip && tipValue > 0
                ? `Donation for ${props.tip.charity_name}`
                : "Total donation"}
            </span>
          </dt>
          <Amount amount={props.amount} classes="text-gray-d4" />
        </div>

        {tipValue > 0 && (
          <div className="col-span-full grid grid-cols-[1fr_auto] py-3">
            <dt className="mr-auto" aria-label="tip">
              Donation for Better Giving
            </dt>
            <Amount classes="text-sm" amount={tipValue} />
          </div>
        )}

        {props.fee_allowance ? (
          <div className="col-span-full grid grid-cols-[1fr_auto] py-3">
            <dt className="mr-auto" aria-label="fee allowance">
              Covered processing fee
            </dt>
            <Amount classes="text-sm" amount={props.fee_allowance} />
          </div>
        ) : null}

        <div className="grid col-span-full grid-cols-[1fr_auto] font-medium py-3">
          <dt className="mr-auto text-gray-d4" aria-label="total">
            Total {frequency === "recurring" ? "monthly " : ""}charge
          </dt>
          <Amount
            amount={props.amount + tipValue + (props.fee_allowance ?? 0)}
          />
        </div>
      </dl>

      {props.children}
    </div>
  );
}
