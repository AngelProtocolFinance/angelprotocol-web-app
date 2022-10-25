import { useGetter } from "store/accessors";
import { DonationState } from "slices/donation";

export default function Progress() {
  const state = useGetter((state) => state.donation);
  const numCompletedSteps = Object.keys(state).length - 1; //each defined key is a complete step - 1 "step" key

  return (
    <div className="my-12 mb-10 grid grid-cols-3 justify-items-center">
      <p>Donation method</p>
      <p>Donation details</p>
      <p>Finalize payment</p>
      <div className="mt-3 h-2 w-full col-span-full bg-gray-l2 dark:bg-bluegray-d1 rounded-full" />
    </div>
  );
}
