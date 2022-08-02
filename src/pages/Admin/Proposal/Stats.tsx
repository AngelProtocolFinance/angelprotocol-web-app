import Decimal from "decimal.js";
import { useMemo } from "react";
import { ProposalDetails } from "services/types";

export default function Stats({ votes, threshold }: ProposalDetails) {
  const [numYes, numNo] = useMemo(
    () =>
      votes.reduce(
        (tally, info) => {
          switch (info.vote) {
            case "yes":
              tally[0]++;
              break;
            case "no":
              tally[1]++;
              break;
          }
          return tally;
        },
        [0, 0, 0, 0]
      ),
    [votes]
  );

  const numVoted = numYes + numNo;
  const total = +threshold.absolute_percentage.total_weight;
  const target = +threshold.absolute_percentage.percentage * 100;

  const pctYes = getPct(numYes, total);
  const pctNo = getPct(numNo, total);

  const pctTarget = getPct(target, total);
  const pctVoted = getPct(numVoted, total);

  return (
    <div>
      <div className="flex justify-around text-lg p-4">
        <Stat
          title="yes"
          value={numYes}
          pct={pctYes}
          textColor="text-emerald-400"
        />
        <Stat title="no" value={numNo} pct={pctNo} textColor="text-rose-400" />
      </div>
      <div
        className="relative mb-8 mt-10 h-4"
        style={{
          //prettier-ignore
          background: `linear-gradient(to right, 
            #34d399 ${pctYes}%, 
            #f43f5e ${pctYes}%, #f43f5e ${pctYes + pctNo}%, 
            #f59e0b ${pctYes + pctNo}%, #f59e0b ${100}%, 
            #fafafa30 ${100}%)`,
        }}
      >
        <p
          className="absolute top-0 h-8 border-l border-emerald-400/80 align-bottom font-mono text-xs"
          style={{ left: `${pctTarget}%` }}
        >
          <span className="absolute -bottom-1/2 right-0 w-max translate-x-1/2 transform">
            threshold: ${target} votes
          </span>
        </p>
      </div>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="text-sm uppercase">total voted</span>
        <span className="font-bold">{numVoted}</span>
        <span className="text-sm">{pctVoted}%</span>
      </p>
    </div>
  );
}

export function Stat(props: {
  title: string;
  value: number;
  pct: number;
  textColor: string;
}) {
  return (
    <p className={`font-mono uppercase ${props.textColor} items-center`}>
      <span>{props.title}</span>
      <span>{`${props.value} (${props.pct.toFixed(2)}%)`}</span>
    </p>
  );
}
function getPct(numerator: number, denominator: number) {
  return roundDown((numerator / denominator) * 100);
}

export function roundDown(num: number, precision = 2) {
  return +new Decimal(num).toFixed(precision, Decimal.ROUND_DOWN);
}
