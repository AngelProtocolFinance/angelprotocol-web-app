import { useOutletContext } from "@remix-run/react";
import { humanize } from "helpers";
import type { EndowmentBalances } from "types/aws";

export default function Balances() {
  const bal = useOutletContext() as EndowmentBalances;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Balance title="Total Contributions" amount={bal.totalContributions} />
    </div>
  );
}

function Balance(props: { title: string; amount: number }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-gray-l4 dark:bg-blue-d6 md:items-start md:h-28 md:px-6 md:py-04">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <p className="font-normal text-lg text-navy-l1 dark:text-navy-l2">
        ${humanize(props.amount)}
      </p>
    </div>
  );
}
