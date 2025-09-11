import type { IPrettyBalance } from "@better-giving/balance";
import { toUsd } from "helpers/to-usd";
import { useOutletContext } from "react-router";

export default function Balances() {
  const bal = useOutletContext() as IPrettyBalance;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Balance title="Total Contributions" amount={bal.ltd} />
    </div>
  );
}

function Balance(props: { title: string; amount: number }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded-sm border border-gray-l3 dark:bg-blue-d6 md:items-start md:h-28 md:px-6 md:py-04">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <p className="font-normal text-lg text-gray dark:text-gray">
        {toUsd(props.amount)}
      </p>
    </div>
  );
}
