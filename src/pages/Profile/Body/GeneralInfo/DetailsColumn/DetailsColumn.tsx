import type { EndowClaim } from "@better-giving/registration/models";
import { Target, toTarget } from "components/target";
import { appRoutes, regRoutes } from "constants/routes";
import { isEmpty } from "helpers";
import { toWithState } from "helpers/state-params";
import type { PropsWithChildren } from "react";
import { Link, useOutletContext } from "react-router";
import type { EndowmentBalances } from "types/aws";
import { useProfileContext } from "../../../ProfileContext";
import Socials from "./Socials";
import Tags from "./Tags";

export default function DetailsColumn({ className = "" }) {
  const p = useProfileContext();
  const bal = useOutletContext() as EndowmentBalances;
  const { active_in_countries = [] } = p;
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className={`${className} w-full lg:w-96`}>
        <div className="flex flex-col gap-8 w-full p-8 border border-gray-l4 rounded">
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
          <Link
            to={appRoutes.donate + `/${p.id}`}
            className="w-full btn-blue h-12 px-6 text-base lg:text-sm"
          >
            Donate now
          </Link>
        </div>
        {p.claimed === false && (
          <Link
            to={toWithState(`${appRoutes.register}/${regRoutes.welcome}`, {
              ein: p.registration_number,
              name: p.name,
              id: p.id,
            } satisfies EndowClaim)}
            className="max-lg:text-center block mt-4 font-medium text-blue-d1 hover:underline p-8 border border-gray-l4 rounded"
          >
            Claim this organization
          </Link>
        )}
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
