import type { INpo } from "@better-giving/endowment";
import { Target, to_target } from "components/target";
import type { PropsWithChildren, ReactNode } from "react";
import { NavLink, href } from "react-router";
import Socials from "./socials";
import { Tags } from "./tags";

interface Props {
  fundraisers?: ReactNode;
  target?: ReactNode;
  npo: INpo;
  classes?: string;
}

export function DetailsColumn({
  classes = "",
  fundraisers,
  npo,
  target,
}: Props) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className={`${classes} w-full lg:w-96`}>
        <div className="flex flex-col gap-8 w-full p-8 border border-gray-l3 rounded-sm">
          {npo.registration_number && (
            <Detail title="registration no.">{npo.registration_number}</Detail>
          )}
          {npo.street_address && (
            <Detail title="address">{npo.street_address}</Detail>
          )}
          <Detail title="active in">
            {npo.active_in_countries.length === 0
              ? npo.hq_country
              : npo.active_in_countries.join(", ")}
          </Detail>
          <Tags
            sdgs={npo.sdgs}
            designation={npo.endow_designation}
            kyc_donors_only={npo.kyc_donors_only}
          />
          {npo.social_media_urls && (
            <Socials social_media_urls={npo.social_media_urls} />
          )}
          {target}
          <NavLink
            to={href("/donate/:id", { id: npo.id.toString() })}
            className="w-full btn btn-blue h-12 px-6 text-base lg:text-sm"
          >
            Donate now
          </NavLink>
        </div>
        {npo.claimed === false && (
          <NavLink
            to={`${href("/register/welcome")}?claim=${npo.registration_number}`}
            className="max-lg:text-center block mt-4 font-medium text-blue-d1 hover:underline p-8 border border-gray-l3 rounded-sm"
          >
            Claim this organization
          </NavLink>
        )}
        {fundraisers}
      </div>
    </div>
  );
}

function Detail(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full">
      <p className=" font-bold text-xs tracking-wider uppercase">
        {props.title}
      </p>
      <span className="font-normal text-base text-gray dark:text-gray">
        {props.children || "-"}
      </span>
    </div>
  );
}
