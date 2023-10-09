import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import Icon from "components/Icon";
import Split from "components/Split";
import { PAYMENT_WORDS, titleCase } from "constants/common";
import { IS_AST } from "constants/env";

type Props = {
  display: "hidden" | "expanded" | "collapsed";
  fixLiquidSplitPct?: number;
  classes?: string;
};

export default function AdvancedOptions({
  classes = "",
  display,
  fixLiquidSplitPct,
}: Props) {
  const { watch } = useFormContext<DonateValues>();
  const tokenAmount = watch("token.amount");
  const tokenSymbol = watch("token.symbol");

  const [isOpen, setIsOpen] = useState(display === "expanded");
  const toggle = () => setIsOpen((prev) => !prev);

  if (display === "hidden") return null;

  return (
    <div
      className={`grid ${classes} border border-prim  rounded overflow-clip`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l6 dark:bg-blue-d7">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-prim h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <div className="grid p-6 pt-4 font-heading border-t border-prim">
          <p className="text-xs uppercase font-bold mb-2">Split</p>
          <Split<DonateValues, "pctLiquidSplit">
            className="mb-6"
            liqPctField="pctLiquidSplit"
            token={{ amount: toNumber(tokenAmount), symbol: tokenSymbol }}
            fixLiquidSplitPct={fixLiquidSplitPct}
          />
          {!IS_AST ? (
            <div className="flex items-center gap-4 px-4 py-3 text-center dark:bg-blue-d6 border border-prim rounded">
              <Icon type="Info" size={44} />
              <p className="text-sm leading-normal text-left">
                {titleCase(PAYMENT_WORDS.noun.plural)} into the Endowment
                provide sustainable financial runaway and allow your gift to
                give forever
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

const toNumber = (input: string) => {
  const num = Number(input);
  return isNaN(num) ? 0 : num;
};
