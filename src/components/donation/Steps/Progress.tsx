import { useGetter } from "store/accessors";
import { PAYMENT_WORDS, titleCase } from "constants/common";

export default function Progress({ classes = "" }: { classes?: string }) {
  const donationState = useGetter((state) => state.donation);

  const numberOfSteps = donationState.recipient?.skipKycStep ? 2 : 3;

  return (
    <div
      className={`${classes} text-sm mb-10 grid grid-cols-${numberOfSteps} justify-items-center gap-2`}
    >
      <p className="text-center">
        {titleCase(PAYMENT_WORDS.noun.singular)} method
      </p>
      {!donationState.recipient?.skipKycStep && (
        <p className="text-center">{titleCase(PAYMENT_WORDS.payer)} details</p>
      )}
      <p className="text-center">Finalize {PAYMENT_WORDS.noun.singular}</p>
      <div className="mt-3 relative h-2 w-full col-span-full bg-gray-l3 dark:bg-bluegray rounded-full overflow-hidden">
        <div
          style={{ width: `${(donationState.step / numberOfSteps) * 100}%` }}
          className="h-full bg-orange rounded-full"
        />
      </div>
    </div>
  );
}
