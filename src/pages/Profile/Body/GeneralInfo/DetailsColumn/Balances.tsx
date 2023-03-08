import { humanize } from "helpers";
import { useProfileContext } from "../../../ProfileContext";

export default function Balances() {
  const { on_hand_liq, on_hand_lock, on_hand_overall } = useProfileContext();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Balance title="Total Value" amount={on_hand_overall} />
      <Balance title="Total Endowment Account" amount={on_hand_lock} />
      <Balance title="Total Current Account" amount={on_hand_liq} />
    </div>
  );
}

function Balance(props: { title: string; amount: number }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-prim dark:bg-blue-d6 md:items-start md:h-28 md:px-6 md:py-04">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${humanize(props.amount)}
      </p>
    </div>
  );
}
