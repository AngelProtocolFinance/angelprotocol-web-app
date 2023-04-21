import { useGetter } from "store/accessors";
import { IS_AST } from "constants/env";

export default function Progress({ classes = "" }: { classes?: string }) {
  const step = useGetter((state) => state.donation.step);

  return (
    <div
      className={`${classes} text-sm mb-10 grid grid-cols-3 justify-items-center gap-2`}
    >
      <p className="text-center">
        {IS_AST ? "Contribution" : "Donation"} method
      </p>
      <p className="text-center">{IS_AST ? "Contributor" : "Donor"} details</p>
      <p className="text-center">
        Finalize {IS_AST ? "contribution" : "donation"}
      </p>
      <div className="mt-3 relative h-2 w-full col-span-full bg-gray-l3 dark:bg-bluegray rounded-full overflow-hidden">
        <div
          style={{ width: `${(step / 3) * 100}%` }}
          className="h-full bg-orange rounded-full"
        />
      </div>
    </div>
  );
}
