import { PropsWithChildren, useEffect, useState } from "react";
import { placeholderChain } from "contexts/WalletContext/constants";
import Icon from "components/Icon";
import { humanize } from "helpers";

const SPLIT_AMOUNT = `${placeholderChain.tokens[0].symbol} ${humanize(0, 5)}`;

type Props = { liquidPercentage: number; unfold: boolean };

export default function AdvancedOptions({ unfold, liquidPercentage }: Props) {
  const [isOpen, setIsOpen] = useState(unfold);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => setIsOpen(unfold), [unfold]);

  return (
    <div className="grid mt-10 border border-gray-l2 rounded overflow-clip">
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l6">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-gray-l2 h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <div className="grid p-6 pt-4 font-heading border-t border-gray-l2">
          <p className="text-xs uppercase font-bold mb-2">Split</p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <Portion
              title="Endowment"
              percentage={100 - liquidPercentage}
              action="Compounded forever"
            />

            <Portion
              title="Current"
              percentage={liquidPercentage}
              action="Instantly available"
            >
              <div className="mt-5 mb-2.5 relative h-1 w-full bg-gray-l2 rounded-full overflow-visible">
                <div
                  className="absolute-center h-3.5 w-3.5 bg-gray-l1 rounded-full"
                  style={{ left: `${liquidPercentage}%` }}
                />
              </div>
            </Portion>
          </div>

          <div className="flex items-center gap-4 px-4 py-3 text-center border border-gray-l2 rounded">
            <Icon type="Info" size={44} />
            <p className="text-sm leading-normal text-left">
              Donations into the Endowment provide sustainable financial runaway
              and allow your gift to give forever
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Portion(
  props: PropsWithChildren<{
    action: string;
    title: string;
    percentage: number;
  }>
) {
  return (
    <div className="flex flex-col items-center p-6 bg-orange-l6 border border-gray-l2 rounded">
      <p className="uppercase font-bold text-sm">{props.title}</p>
      <p className="text-xs mb-2 font-bold">{props.percentage}%</p>
      <p className="uppercase text-xs text-center font-body">{props.action}</p>
      {props.children}
      <p className="mt-auto font-bold text-center">{SPLIT_AMOUNT}</p>
    </div>
  );
}
