import { PAYMENT_WORDS } from "constant/common";
import Image from "components/Image";

export default function NoDonations({ classes = "" }) {
  return (
    <div
      className={`${classes} max-sm:text-center grid sm:grid-cols-[1fr_auto] font-work max-w-md gap-y-2 gap-x-4`}
    >
      <Image
        alt="someone looking for an object"
        src="/images/not-found.png"
        className="max-sm:place-self-center sm:col-start-2 sm:row-start-1 sm:row-span-2 rounded-full w-48 object-cover object-center"
      />
      <h3 className="text-lg self-end">
        No {PAYMENT_WORDS.noun.plural} found.
      </h3>
      <p className="self-start text-gray-d1 dark:text-gray">
        Sorry! We coudn't find any {PAYMENT_WORDS.noun.plural}. Try connecting a
        different wallet ( or adjust any filters applied ).
      </p>
    </div>
  );
}
