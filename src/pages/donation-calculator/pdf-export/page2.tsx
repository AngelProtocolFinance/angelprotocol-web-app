import { Splits } from "../chart/splits";
import { Visual } from "../chart/visual";

import v from "./data.json";

export function Page2() {
  const data = v.projection.slice(0, 5).map((x, i) => {
    const y = i + 1;
    return {
      year: `Year ${y}`,
      amount: v.amount,
      liq: x.liq,
      savings: v.advantage * y,
      lock: x.lock,
      total: v.advantage * y + x.total,
    };
  });
  return (
    <div className="w-full aspect-[297/210] pt-8">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
        <h2 className="text-blue text-3xl font-semibold uppercase">
          Total 5 - 10 - 15 - 20 years financial advantage
        </h2>
        <div className="h-0.5 bg-blue" />
        <p className="text-blue text-3xl font-semibold uppercase">
          (Estimated Predictions)
        </p>
      </div>
      <p className="text-2xl px-6 font-bold text-gray-d1 mt-4">
        Compound Growth = Exponential Impact
      </p>
      <div className="grid grid-cols-2 px-8 gap-16 mt-8">
        <div>
          <Splits
            classes="justify-self-end"
            notGranted={10}
            savings={100_000}
            savingsRate={0.5}
            invested={100_000}
            investedRate={0.5}
          />
          <div className="h-80 w-full">
            <Visual points={data} />
          </div>
        </div>
        <div>
          <Splits
            classes="justify-self-end"
            notGranted={10}
            savings={100_000}
            savingsRate={0.5}
            invested={100_000}
            investedRate={0.5}
          />
          <div className="h-80 w-full">
            <Visual points={data} />
          </div>
        </div>
        <div>
          <Splits
            classes="justify-self-end"
            notGranted={10}
            savings={100_000}
            savingsRate={0.5}
            invested={100_000}
            investedRate={0.5}
          />
          <div className="h-80 w-full">
            <Visual points={data} />
          </div>
        </div>
        <div>
          <Splits
            classes="justify-self-end"
            notGranted={10}
            savings={100_000}
            savingsRate={0.5}
            invested={100_000}
            investedRate={0.5}
          />
          <div className="h-80 w-full">
            <Visual points={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
