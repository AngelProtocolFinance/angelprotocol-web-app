import { humanize } from "helpers";
import { useProfileContext } from "../../../ProfileContext";

export default function Balances() {
  const { total_liq, total_lock, overall } = useProfileContext();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Balance title="Total Value" amount={overall} />
      <Balance title="Total Endowment Account" amount={total_lock} />
      <Balance title="Total Current Account" amount={total_liq} />
    </div>
  );
}

function Balance(props: { title: string; amount: number }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-prim dark:bg-blue-d6 md:items-start md:h-28 md:px-6 md:py-04">
      <h6 className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${humanize(props.amount)}
      </p>
    </div>
  );
}
