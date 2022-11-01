import { useGetter } from "store/accessors";

export default function Progress({ classes = "" }: { classes?: string }) {
  const step = useGetter((state) => state.donation.step);

  return (
    <div
      className={`${classes} text-sm mb-10 grid grid-cols-3 justify-items-center gap-2`}
    >
      <p className="text-center">Donation method</p>
      <p className="text-center">Donation details</p>
      <p className="text-center">Finalize payment</p>
      <div className="mt-3 relative h-2 w-full col-span-full bg-gray-l2 dark:bg-bluegray rounded-full overflow-hidden">
        <div
          style={{ width: `${(step / 3) * 100}%` }}
          className="h-full bg-orange rounded-full"
        />
      </div>
    </div>
  );
}
