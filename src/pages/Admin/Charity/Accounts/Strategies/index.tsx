import { AccountType } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import Icon from "components/Icon";
import { maskAddress } from "helpers";
import PieChart from "../../PieChart";

export default function Strategies(props: { type: AccountType }) {
  const { endowment } = useAdminResources();

  const strats = endowment.strategies[props.type];

  function getArcCoordinate(pct: number) {
    const x = Math.cos(2 * Math.PI * pct);
    const y = Math.sin(2 * Math.PI * pct);
    return [x, y] as const;
  }
  const slices = [
    { percent: 0.25, color: "Coral" },
    { percent: 0.25, color: "CornflowerBlue" },
    { percent: 0.25, color: "#00ab6b" },
    { percent: 0.25, color: "#fff" },
  ];

  return (
    <div className="mt-6 border border-zinc-50/20 rounded-md p-4">
      <svg
        viewBox="-1 -1 2 2"
        style={{ transform: "rotate(-0.25turn)" }}
        className="max-w-sm"
      >
        {(() => {
          let cumulativePct = 0;
          return slices.map((slice, i) => {
            const [startX, startY] = getArcCoordinate(cumulativePct);
            cumulativePct += slice.percent;
            const [endX, endY] = getArcCoordinate(cumulativePct);
            const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
            return (
              <path
                key={i}
                d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`}
                fill={slice.color}
              />
            );
          });
        })()}
      </svg>
      <h4 className="font-bold text-lg uppercase mb-4">Strategies</h4>
      {(strats.length > 0 && (
        <div className="grid grid-cols-[auto_1fr] content-start items-center gap-x-4">
          {/* <div>
            {strats.map((strategy) => (
              <div
                key={strategy.vault}
                className="text-zinc-50/80 flex items-center gap-2"
              >
                <span className="font-heading text-lg font-bold">
                  {+strategy.percentage * 100} %
                </span>
                <Icon type="Safe" size={36} />
                <span className="font-mono text-sm">
                  {maskAddress(strategy.vault)}
                </span>
              </div>
            ))}
          </div> */}
          <PieChart
            classes={{ container: "max-w-sm justify-self-start" }}
            max={100}
            slices={strats.map((s) => ({
              name: maskAddress(s.vault),
              value: +s.percentage * 100,
            }))}
          />
        </div>
      )) || <p>add strategy</p>}
    </div>
  );
}
