import { Transaction } from "types/tx";
import { roundDownToNum } from "helpers";
import { useAdminContext } from "../Context";

export default function Stats({ confirmations, owners }: Transaction) {
  const {
    config: { threshold },
  } = useAdminContext();
  const numSigned = confirmations.length;
  const numSigners = owners.length;

  const pctSigned = pct(numSigned, numSigners);
  const pctPending = 100 - pctSigned;
  const pctTarget = pct(threshold, numSigners);

  return (
    <div>
      <div className="flex gap-4 text-lg py-4">
        <Stat
          title="signed"
          value={numSigned}
          pct={pctSigned}
          textColor="text-green-l1"
        />
        <Stat
          title="pending"
          value={numSigners - numSigned}
          pct={pctPending}
          textColor="text-red-l1"
        />
      </div>
      <div
        className="relative mb-8 mt-10 h-4 border border-gray-l3 dark:border-none"
        style={{
          //prettier-ignore
          background: `linear-gradient(to right, 
            #34d39990 ${pctSigned}%, 
            #f43f5e90 ${pctSigned}%, #fafafa30 ${pctSigned}%, 
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
        <span className="text-sm uppercase">total signed</span>
        <span className="font-bold">{numSigned}</span>
        <span className="text-sm text-gray-d1 dark:text-gray">
          {pctSigned}%
        </span>
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
      className={`uppercase ${props.textColor} grid min-w-[10rem] rounded-md border border-prim bg-orange-l6 dark:bg-blue-d7 p-4`}
    >
      <span className="">{props.title}</span>
      <span className="my-2 text-2xl">{props.value}</span>
      <span className="text-sm text-gray-d1 dark:text-gray">{props.pct}%</span>
    </p>
  );
}

function pct(numerator: number, denominator: number) {
  return roundDownToNum((numerator / denominator) * 100);
}
