import { useProfileContext } from "pages/Profile/ProfileContext";
import { humanize } from "helpers";

export default function Balances() {
  const { totalContributions } = useProfileContext();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Balance title="Total Contributions" amount={totalContributions || 0} />
    </div>
  );
}

function Balance(props: { title: string; amount: number }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 rounded border border-gray-l3 dark:border-bluegray dark:bg-blue-d6 md:items-start md:h-28 md:px-6 md:py-04">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <p className="font-work font-normal text-lg text-gray-d1 dark:text-gray">
        ${humanize(props.amount)}
      </p>
    </div>
  );
}
