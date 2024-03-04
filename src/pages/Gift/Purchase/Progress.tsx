import { useGetter } from "store/accessors";

const NUM_STEPS = 2;
export default function Progress({ classes = "" }: { classes?: string }) {
  const step = useGetter((state) => state.gift.step);

  return (
    <div
      className={`${classes} text-sm mb-10 grid grid-cols-2 justify-items-center gap-2`}
    >
      <p className="text-center">Donation Method</p>
      <p className="text-center">Finalize Payment</p>
      <div className="mt-3 relative h-2 w-full col-span-full bg-gray-l3 dark:bg-navy rounded-full overflow-hidden">
        <div
          style={{ width: `${(step / NUM_STEPS) * 100}%` }}
          className="h-full bg-orange rounded-full"
        />
      </div>
    </div>
  );
}
