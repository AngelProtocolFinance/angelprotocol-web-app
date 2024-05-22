// TODO: Swap with "pointing" character, once asset is available
import character from "assets/laira/laira-waiving.png";
import Image from "components/Image/Image";
import type { ReactNode } from "react";
import type { FiatPaymentFrequency } from "types/aws";
import Icon from "../../../Icon";
import { unpack } from "../../../form/helpers";
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
  frequency?: FiatPaymentFrequency;
  classes?: Classes;
  children?: ReactNode;
  preSplitContent?: ReactNode;
};

export default function Summary({
  Amount,
  frequency = "one-time",
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
        {(props.tip || locked > 0) && (
          <>
            <dt className="mr-auto text-navy-d4">
              {props.tip
                ? `Donation for ${props.tip.charityName}`
                : "Total donation"}
            </dt>
            <Amount amount={props.amount} classes="text-navy-d4" />
            {locked > 0 && (
              <>
                <div className="flex items-center justify-between col-span-full">
                  <div className="mr-auto flex">
                    <dt className="text-sm mt-2">Sustainability Fund</dt>
                    <Image src={character} className="inline-block px-1 h-8" />
                  </div>
                  <Amount classes="text-sm" amount={locked} />
                </div>
                <div className="flex items-center justify-between col-span-full">
                  <dt className="mr-auto text-sm">Direct Donation</dt>
                  <Amount classes="text-sm" amount={liq} />
                </div>
              </>
            )}
            {props.tip && (
              <div className="col-span-full grid grid-cols-[1fr_auto] border-y border-gray-l4 py-3">
                <dt className="mr-auto">Donation for Better Giving</dt>
                <Amount classes="text-sm" amount={props.tip.value} />
              </div>
            )}
          </>
        )}
        <div className="col-span-full grid grid-cols-[1fr_auto] pt-1 font-medium">
          <dt className="mr-auto text-navy-d4">
            Total {frequency === "subscription" ? "monthly " : ""}charge
          </dt>
          <Amount amount={props.amount + (props.tip ? props.tip.value : 0)} />
        </div>
      </dl>
      {locked > 0 && (
        <div className="flex py-3">
          <Image src={character} className="inline-block mt-1 pl-1 pr-2 h-8" />
          <div className="mr-auto text-sm text-navy-l3">
            The Sustainability Fund invests your donation for long-term growth
            to provide reliable, ongoing funding. Give today, give forever!
          </div>
        </div>
      )}

      {props.children}
    </div>
  );
}
