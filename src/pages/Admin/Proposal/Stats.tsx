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

  const pctYes = getPct(numYes, total);
  const pctNo = getPct(numNo, total);

  const pctTarget = +threshold.absolute_percentage.percentage * 100;
  const pctVoted = getPct(numVoted, total);

  return (
    <div>
      <div className="flex gap-4 text-lg py-4">
        <Stat
          title="yes"
          value={numYes}
          pct={pctYes}
          textColor="text-green-l1"
        />
        <Stat title="no" value={numNo} pct={pctNo} textColor="text-red-l1" />
      </div>
      <div
        className="relative mb-8 mt-10 h-4"
        style={{
          //prettier-ignore
          background: `linear-gradient(to right, 
            #34d39990 ${pctYes}%, 
            #f43f5e90 ${pctYes}%, #f43f5e90 ${pctYes + pctNo}%, 
            #fafafa30 ${pctYes + pctNo}%, #fafafa30 ${100}%, 
            #fafafa30 ${100}%)`,
        }}
      >
        <p
          className="absolute bottom-0 h-8 border-l border-green-l1/80 align-bottom font-mono text-xs"
          style={{ left: `${pctTarget}%` }}
        >
          <span className="absolute -top-1/2 right-0 w-max translate-x-1/2 transform">
            threshold: {pctTarget}%
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

function Stat(props: {
  title: string;
  value: number;
  pct: number;
  textColor: string;
}) {
  return (
    <p
      className={`uppercase ${props.textColor} grid min-w-[10rem] rounded-md border border-white/30 p-4`}
    >
      <span className="">{props.title}</span>
      <span className="my-2 text-2xl">{props.value}</span>
      <span className="text-sm">{props.pct}%</span>
    </p>
  );
}

function getPct(numerator: number, denominator: number) {
  return roundDown((numerator / denominator) * 100);
}

export function roundDown(num: number, precision = 2) {
  return +new Decimal(num).toFixed(precision, Decimal.ROUND_DOWN);
}
