import { useEffect, useState } from "react";
import { placeholderChain } from "contexts/WalletContext/constants";
import Icon from "components/Icon";
import { humanize } from "helpers";

const SPLIT_AMOUNT = `${placeholderChain.tokens[0].symbol} ${humanize(0)}`;

export default function AdvancedOptions({
  unfold,
  liquidPercentage,
}: {
  liquidPercentage: number;
  unfold: boolean;
}) {
  const [isOpen, setIsOpen] = useState(unfold);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => setIsOpen(unfold), [unfold]);

  return (
    <div className={`grid mt-10 border border-prim  rounded overflow-clip`}>
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

          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="flex flex-col items-center p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
              <p className="uppercase font-bold text-sm sm:text-base">
                Endowment
              </p>
              <p className="text-xs sm:text-sm mb-2 font-bold">
                {100 - liquidPercentage}%
              </p>
              <p className="uppercase text-xs sm:text-sm text-center font-body">
                Compounded forever
              </p>
              <p className="mt-auto font-bold md:text-lg text-center">
                {SPLIT_AMOUNT}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-orange-l6 dark:bg-blue-d6 border border-prim rounded">
              <p className="uppercase font-bold text-sm sm:text-base">
                Current
              </p>
              <p className="text-xs sm:text-sm mb-2 font-bold">
                {liquidPercentage}%
              </p>
              <p className="uppercase text-xs sm:text-sm text-center font-body">
                Instantly available
              </p>
              <div className="my-2.5 select-none">
                <input
                  className="range"
                  disabled
                  type="range"
                  value={liquidPercentage}
                />
              </div>
              <p className="mt-auto font-bold md:text-lg text-center">
                {SPLIT_AMOUNT}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 py-3 text-center dark:bg-blue-d6 border border-prim rounded">
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
