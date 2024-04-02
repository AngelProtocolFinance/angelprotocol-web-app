import { isEmpty } from "helpers";
import { PropsWithChildren } from "react";
import { useProfileContext } from "../../../ProfileContext";
import DonateButton from "../../DonateButton";
import Balances from "./Balances";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className = "" }) {
  const p = useProfileContext();
  const { active_in_countries = [] } = p;
  return (
    <div className="flex flex-col gap-6 w-full">
      <Balances />

      <div
        className={`${className} flex flex-col gap-8 w-full lg:w-96 p-8 border border-gray-l4 rounded text-navy-d4 dark:bg-blue-d6  dark:text-white`}
      >
        {p.registration_number && (
          <Detail title="registration no.">{p.registration_number}</Detail>
        )}
        {p.street_address && (
          <Detail title="address">{p.street_address}</Detail>
        )}
        <Detail title="active in">
          {isEmpty(active_in_countries)
            ? p.hq_country
            : active_in_countries.join(", ")}
        </Detail>
        <Tags {...p} />
        {p.social_media_urls && (
          <Socials social_media_urls={p.social_media_urls} />
        )}
        <DonateButton className="w-full" />
      </div>
    </div>
  );
}

function Detail(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <p className="font-heading font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <span className="font-normal text-base text-navy-l1 dark:text-navy-l2">
        {props.children || "-"}
      </span>
    </div>
  );
}
