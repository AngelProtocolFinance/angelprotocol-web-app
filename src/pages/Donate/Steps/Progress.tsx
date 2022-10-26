import { useGetter } from "store/accessors";

export default function Progress() {
  const state = useGetter((state) => state.donation);
  const numCompletedSteps = Object.keys(state).length - 1; //each defined key is a complete step - 1 "step" key

  return (
    <div className="my-12 text-sm mb-10 grid grid-cols-3 justify-items-center">
      <p>Donation method</p>
      <p>Donation details</p>
      <p>Finalize payment</p>
      <div className="mt-3 relative h-2 w-full col-span-full bg-gray-l2 dark:bg-bluegray-d1 rounded-full overflow-hidden">
        <div
          style={{ width: `${(numCompletedSteps / 3) * 100}%` }}
          className="h-full bg-orange rounded-full"
        />
      </div>
    </div>
  );
}
