import { BookmarkBtn } from "components/bookmark-btn";
import { Breadcrumbs } from "components/breadcrumbs";
import { ExtLink } from "components/ext-link";
import { Target, to_target } from "components/target";
import { VerifiedIcon } from "components/verified-icon";
import { app_routes } from "constants/routes";
import { Globe, MapPin } from "lucide-react";
import { NavLink } from "react-router";

import type { IPrettyBalance } from "@better-giving/balance";
import type { INpo } from "@better-giving/endowment";
import type { DetailedUser } from "types/auth";

interface Props {
  bal: IPrettyBalance;
  npo: INpo;
  user: DetailedUser | undefined;
  classes?: string;
  children?: React.ReactNode;
}

export function Body({ classes = "", npo, user, children, bal }: Props) {
  return (
    <div
      className={`flex justify-center items-center w-full h-full ${classes}`}
    >
      <div className="xl:container xl:mx-auto px-5 grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[1fr_auto] lg:justify-items-start lg:gap-16 lg:pt-6 lg:pb-20">
        <Breadcrumbs
          className="font-normal text-xs sm:text-sm lg:ml-52"
          items={[
            {
              title: "Marketplace",
              to: `${app_routes.marketplace}/${npo.id}`,
              end: true,
            },
            { title: npo.name, to: `${app_routes.marketplace}/${npo.id}` },
          ]}
        />
        <div className="order-3 lg:order-2 flex items-center gap-4 max-lg:flex-col w-full">
          {npo.target && (
            <Target
              text={<Target.Text classes="mb-2" />}
              progress={bal.ltd}
              target={to_target(npo.target)}
            />
          )}
          <NavLink
            to={`${app_routes.donate}/${npo.id}`}
            className="btn btn-blue w-full lg:w-48 h-12 px-6 text-base lg:text-sm"
          >
            Donate now
          </NavLink>
        </div>

        <div className="order-2 lg:order-3 lg:col-span-2 flex flex-col gap-8 w-full items-center">
          <div className="flex flex-col items-center lg:items-start w-full gap-2 text-center lg:text-left">
            <div className="flex max-sm:flex-col items-center gap-3">
              <h3 className="font-header text-3xl w-full max-w-2xl break-words">
                {(npo.claimed ?? true) && (
                  <VerifiedIcon
                    classes="relative inline bottom-px mr-2"
                    size={27}
                  />
                )}
                <span>{npo.name}</span>
              </h3>
              <BookmarkBtn endowId={npo.id} user={user} />
            </div>
            <p className="w-full font-normal text-lg">{npo.tagline}</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center w-full font-semibold text-base">
            {npo.hq_country && (
              <span className="flex items-center gap-2 uppercase">
                <MapPin className="text-blue-d1" size={20} />
                {npo.hq_country}
              </span>
            )}

            {npo.url && (
              <span className="flex items-center gap-2">
                <Globe className="text-blue-d1" size={20} />
                <ExtLink
                  href={npo.url}
                  title="organization website"
                  className="cursor-pointer underline decoration-1 hover:text-blue-d1 hover:decoration-2"
                >
                  {npo.url.replace(/^https?:\/\//i, "")}
                </ExtLink>
              </span>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
