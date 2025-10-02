import type { TOnHoldStatus } from "@better-giving/donation";
import laira_waiving from "assets/laira/laira-waiving.webp";
import { Image } from "components/image";

type Props = {
  classes: string;
  status: TOnHoldStatus;
};

export function NoDonations({ classes, status }: Props) {
  return (
    <div
      className={`${classes} max-sm:text-center grid sm:grid-cols-[1fr_auto] max-w-md gap-y-2 gap-x-4`}
    >
      <Image
        alt="Laira mascot waving"
        src={laira_waiving}
        className="max-sm:place-self-center sm:col-start-2 sm:row-start-1 sm:row-span-2"
        width={100}
      />
      <h3 className="text-lg self-end">No donations found.</h3>
      <p className="self-start text-gray dark:text-gray">
        {status === "pending"
          ? "You have no donations pending"
          : "You've not made any donations yet"}
        . Take a look at our marketplace to choose from hundreds of nonprofits
        that are waiting for your donation. Every donation makes a difference.
      </p>
    </div>
  );
}
