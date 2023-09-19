import { useState } from "react";
import { DonateValues } from "../types";
import Icon from "components/Icon";
import Split from "components/Split";
import { PAYMENT_WORDS, titleCase } from "constant/common";
import { IS_AST } from "constant/env";

type Props = { classes?: string; unfold?: boolean };

export default function AdvancedOptions({ classes = "", unfold }: Props) {
  const [isOpen, setIsOpen] = useState(unfold);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={`grid ${classes} border border-gray-l3 dark:border-bluegray  rounded overflow-clip`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-orange-l6 dark:bg-blue-d7">
        <span className="font-bold py-2">
          {isOpen && "Hide"} Advanced Options
        </span>
        <button
          type="button"
          onClick={toggle}
          className="border border-gray-l3 dark:border-bluegray h-full aspect-square rounded grid place-items-center"
        >
          <Icon type={isOpen ? "Dash" : "Plus"} size={15} />
        </button>
      </div>
      {isOpen && (
        <div className="grid p-6 pt-4 font-heading border-t border-gray-l3 dark:border-bluegray">
          <p className="text-xs uppercase font-bold mb-2">Split</p>
          <Split<DonateValues, "pctLiquidSplit", "token">
            className="mb-6"
            liqPctField="pctLiquidSplit"
            tokenField="token"
          />
          {!IS_AST ? (
            <div className="flex items-center gap-4 px-4 py-3 text-center dark:bg-blue-d6 border border-gray-l3 dark:border-bluegray rounded">
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
