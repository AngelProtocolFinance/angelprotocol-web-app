import { getEndowBalance } from "api/get/endow-balance";
import { getProgram } from "api/get/program";
import { getPrograms } from "api/get/programs";
import BookmarkBtn from "components/BookmarkBtn";
import Breadcrumbs from "components/Breadcrumbs";
import ExtLink from "components/ExtLink";
import VerifiedIcon from "components/VerifiedIcon";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import { Globe, MapPin } from "lucide-react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Link, Outlet, type RouteObject } from "react-router-dom";
import type { DetailedUser } from "types/auth";
import type { EndowmentBalances } from "types/aws";
import { useProfileContext } from "../ProfileContext";
import GeneralInfo from "./GeneralInfo";
import Program from "./Program";
import { featuredMedia } from "./featured-media";

function Body() {
  const p = useProfileContext();
  const bal = useLoaderData() as EndowmentBalances;
  const user = useRouteLoaderData("root") as DetailedUser | null;

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[1fr_auto] lg:justify-items-start lg:gap-16 lg:pt-6 lg:pb-20">
        <Breadcrumbs
          className="font-normal text-xs sm:text-sm lg:ml-52"
          items={[
            {
              title: "Marketplace",
              to: `${appRoutes.marketplace}/`,
              end: true,
            },
            { title: p.name, to: `${appRoutes.marketplace}/${p.id}` },
          ]}
        />
        <div className="order-3 lg:order-2 flex items-center gap-4 max-lg:flex-col w-full">
          {bal.totalContributions != null && p.target && (
            <Target
              text={<Target.Text classes="mb-2" />}
              progress={bal.totalContributions}
              target={toTarget(p.target)}
            />
          )}
          <Link
            to={`${appRoutes.donate}/${p.id}`}
            className="btn-blue w-full lg:w-48 h-12 px-6 text-base lg:text-sm"
          >
            Donate now
          </Link>
        </div>

        <div className="order-2 lg:order-3 lg:col-span-2 flex flex-col gap-8 w-full items-center">
          <div className="flex flex-col items-center lg:items-start w-full gap-2 text-center lg:text-left">
            <div className="flex max-sm:flex-col items-center gap-3">
              <h3 className="font-header text-3xl w-full max-w-2xl break-words">
                {(p.claimed ?? true) && (
                  <VerifiedIcon
                    classes="relative inline bottom-px mr-2"
                    size={27}
                  />
                )}
                <span>{p.name}</span>
              </h3>
              <BookmarkBtn endowId={p.id} user={user} />
            </div>
            <p className="w-full font-normal text-lg">{p.tagline}</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center w-full font-semibold text-base">
            {p.hq_country && (
              <span className="flex items-center gap-2 uppercase">
                <MapPin className="text-blue-d1" size={20} />
                {p.hq_country}
              </span>
            )}

            {p.url && (
              <span className="flex items-center gap-2">
                <Globe className="text-blue-d1" size={20} />
                <ExtLink
                  href={p.url}
                  title="organization website"
                  className="cursor-pointer underline decoration-1 hover:text-blue-d1 hover:decoration-2"
                >
                  {p.url.replace(/^https?:\/\//i, "")}
                </ExtLink>
              </span>
            )}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export const bodyRoute: RouteObject = {
  element: <Body />,
  loader: async ({ params }) => getEndowBalance(params.id),
  children: [
    {
      index: true,
      element: <GeneralInfo className="order-4 lg:col-span-2 w-full h-full" />,
      loader: async ({ params }) =>
        Promise.all([getPrograms(params.id), featuredMedia(params.id)]),
    },
    {
      path: "program/:programId",
      element: <Program className="order-4 lg:col-span-2 w-full h-full" />,
      loader: ({ params }) => getProgram(params.id, params.programId),
    },
  ],
};
