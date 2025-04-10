import { Splits } from "../chart/splits";
import { Visual } from "../chart/visual";

import sample from "./data.json";

const views = [
  {
    key: 5,
    label: "Short-Term Impact (5-Year View)",
  },
  {
    key: 10,
    label: "Momentum Building (10-Year View)",
  },
  {
    key: 15,
    label: "Strategic Growth Horizon (15-Year View)",
  },
  {
    key: 20,
    label: "Long-Term Transformation (20-Year View)",
  },
];

export function Page2() {
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
        {views.map((view) => {
          const data = sample.projection.slice(0, view.key).map((x, i) => {
            const y = i + 1;
            return {
              year: `Year ${y}`,
              amount: sample.amount,
              liq: x.liq,
              savings: sample.advantage * y,
              lock: x.lock,
              total: sample.advantage * y + x.total,
            };
          });

          return (
            <div key={view.key}>
              <div className="mb-4 flex items-center gap-x-2 rounded-l-full p-2 bg-blue-l4">
                <div className="size-4 p-4 relative text-sm rounded-full bg-blue text-white font-heading font-bold">
                  <span className="absolute absolute-center">{view.key}</span>
                </div>
                <span>{view.label}</span>
              </div>
              <Splits
                classes="justify-self-end"
                notGranted={10}
                savings={100_000}
                savingsRate={0.5}
                invested={100_000}
                investedRate={0.5}
              />
              <div className="h-80 w-full">
                <Visual points={data} tools={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
