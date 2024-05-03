import character from "assets/images/waving-character.png";
import Image from "components/Image";
import type { DonationsQueryParams } from "types/aws";

type Props = {
  classes: string;
  status: DonationsQueryParams["status"];
};

export default function NoDonations({ classes, status }: Props) {
  return (
    <div
      className={`${classes} max-sm:text-center grid sm:grid-cols-[1fr_auto] max-w-md gap-y-2 gap-x-4`}
    >
      <Image
        alt="Laira mascot waving"
        src={character}
        className="max-sm:place-self-center sm:col-start-2 sm:row-start-1 sm:row-span-2 rounded-full w-48 object-cover object-center"
      />
      <h3 className="text-lg self-end">No donations found.</h3>
      <p className="self-start text-navy-l1 dark:text-navy-l2">
        {status === "pending"
          ? "You have no donations pending"
          : "You've not made any donations yet"}
        . Take a look at our marketplace to choose from hundreds of nonprofits
        that are waiting for your donation. Every donation makes a difference.
      </p>
    </div>
  );
}
