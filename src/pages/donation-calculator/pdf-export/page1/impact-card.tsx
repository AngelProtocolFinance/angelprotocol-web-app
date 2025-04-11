import { toUsd } from "helpers/to-usd";
import type { Growth } from "../../types";

interface Props extends Growth {
  title: string;
}

export function ImpactCard(p: Props) {
  return (
    <div className="grid grid-rows-subgrid row-span-[13] content-start group">
      <div className="bg-green-l5 grid grid-rows-subgrid row-span-2 py-2 px-2">
        <h3 className="text-right font-semibold">{p.title}</h3>
        <p className="text-right text-green text-2xl font-bold">
          {toUsd(p.total)}
        </p>
      </div>

      <p className="font-semibold text-right mt-6 px-2">Savings Account (4%)</p>
      <p className="text-right px-2">
        <span className="mr-2">Invested:</span>
        <span>{toUsd(p.liq)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Growth:</span>
        <span>{toUsd(p.end.liq - p.liq)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Balance:</span>
        <span>{toUsd(p.end.liq)}</span>
      </p>

      <p className="font-semibold text-right mt-6 px-2">
        Investment Account (20%)
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Invested:</span>
        <span>{toUsd(p.lock)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Growth:</span>
        <span className="text-green">{toUsd(p.end.lock - p.lock)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Balance:</span>
        <span>{toUsd(p.end.lock)}</span>
      </p>

      <p className="text-right px-2">
        <span className="mr-2">Total Growth:</span>
        <span className="text-green">{toUsd(p.total)}</span>
      </p>

      <div className="grid grid-rows-subgrid row-span-2 mt-6 bg-green-l5 py-4 px-2">
        <p className="text-right font-semibold">1 Year Balance</p>
        <p className="text-right text-green text-xl font-bold">
          {toUsd(p.end.total)}
        </p>
      </div>
    </div>
  );
}
