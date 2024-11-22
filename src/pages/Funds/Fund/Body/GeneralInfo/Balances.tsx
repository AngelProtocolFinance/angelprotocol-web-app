import { humanize } from "helpers";

export default function Balances({ amount }: { amount: number }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-20 w-full py-4 md:h-28 md:px-6">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        Total Contributions
      </p>
      <p className="font-normal text-lg text-navy-l1 dark:text-navy-l2">
        ${humanize(amount)}
      </p>
    </div>
  );
}
