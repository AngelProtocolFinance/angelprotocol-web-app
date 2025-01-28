import { NavLink, useOutletContext } from "@remix-run/react";
import { Target, toTarget } from "components/target";
import { appRoutes, regRoutes } from "constants/routes";
import { isEmpty } from "helpers";
import type { PropsWithChildren } from "react";
import type { EndowmentBalances } from "types/aws";
import { useProfileContext } from "../../../profile-context";
import { Fundraisers } from "./fundraisers";
import Socials from "./socials";
import Tags from "./tags";

export default function DetailsColumn({ className = "" }) {
  const p = useProfileContext();
  const bal = useOutletContext() as EndowmentBalances;
  const { active_in_countries = [] } = p;
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className={`${className} w-full lg:w-96`}>
        <div className="flex flex-col gap-8 w-full p-8 border border-gray-l4 rounded-sm">
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
          {bal.totalContributions != null && p.target && (
            <Target
              text={<Target.Text classes="mb-2" />}
              progress={bal.totalContributions}
              target={toTarget(p.target)}
              classes="-mb-5 mt-4"
            />
          )}
          <NavLink
            to={appRoutes.donate + `/${p.id}`}
            className="w-full btn-blue h-12 px-6 text-base lg:text-sm"
          >
            Donate now
          </NavLink>
        </div>
        {p.claimed === false && (
          <NavLink
            to={`${appRoutes.register}/${regRoutes.welcome}?claim=${p.registration_number}`}
            className="max-lg:text-center block mt-4 font-medium text-blue-d1 hover:underline p-8 border border-gray-l4 rounded-sm"
          >
            Claim this organization
          </NavLink>
        )}
        <Fundraisers classes="mt-4" />
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
      <span className="font-normal text-base text-gray dark:text-gray">
        {props.children || "-"}
      </span>
    </div>
  );
}
