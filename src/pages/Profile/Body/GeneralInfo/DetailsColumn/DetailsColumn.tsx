import { PropsWithChildren } from "react";
import { useProfileContext } from "pages/Profile/ProfileContext";
import { maskAddress } from "helpers";
import DonateButton from "../../DonateButton";
import Balances from "./Balances";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className }: { className: string }) {
  const profile = useProfileContext();

  console.log(profile);

  return (
    <div className="flex flex-col gap-6 w-full">
      <Balances />

      <div
        className={`${className} flex flex-col gap-8 w-full lg:w-96 p-4 border border-gray-l2 rounded text-gray-d2 dark:bg-blue-d6 dark:border-bluegray dark:text-white sm:p-8`}
      >
        <Detail title="registration no.">{profile.registration_number}</Detail>
        <Detail title="address">
          {createAddress(profile.street_address, profile.country_of_origin)}
        </Detail>
        <Detail title="endowment address">
          {maskAddress(profile.owner, 14)}
        </Detail>
        <Tags />
        <Socials />
        <DonateButton />
      </div>
    </div>
  );
}

function Detail(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <h6 className="font-header font-bold text-xs tracking-wider uppercase">
        {props.title}
      </h6>
      <span className="font-work font-normal text-base text-gray-d1 dark:text-gray">
        {props.children || "no data"}
      </span>
    </div>
  );
}

function createAddress(
  street_address: string | undefined,
  country_of_origin: string | undefined
): string | undefined {
  if (!street_address) {
    return country_of_origin;
  } else if (!country_of_origin) {
    return street_address;
  } else {
    return street_address + ", " + country_of_origin;
  }
}
