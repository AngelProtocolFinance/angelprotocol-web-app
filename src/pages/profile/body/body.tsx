import { BookmarkBtn } from "components/bookmark-btn";
import { Breadcrumbs } from "components/breadcrumbs";
import { ExtLink } from "components/ext-link";
import { Target, toTarget } from "components/target";
import { VerifiedIcon } from "components/verified-icon";
import { appRoutes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";
import { Globe, MapPin } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { useProfileContext } from "../profile-context";
import type { Route } from "./+types/body";
import { npoId } from "./common/npo-id";
import { baldb } from ".server/aws/db";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const id = await npoId(params.id);
  if (typeof id !== "number") return id;
  return baldb.npo_balance(id);
};
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export default CacheRoute(Page);

function Page({ loaderData: bal }: Route.ComponentProps) {
  const p = useProfileContext();
  const user = useRootData();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="xl:container xl:mx-auto px-5 grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[1fr_auto] lg:justify-items-start lg:gap-16 lg:pt-6 lg:pb-20">
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
          {p.target && (
            <Target
              text={<Target.Text classes="mb-2" />}
              progress={bal.ltd}
              target={toTarget(p.target)}
            />
          )}
          <NavLink
            to={`${appRoutes.donate}/${p.id}`}
            className="btn btn-blue w-full lg:w-48 h-12 px-6 text-base lg:text-sm"
          >
            Donate now
          </NavLink>
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

        <Outlet context={bal} key="profile-body" />
      </div>
    </div>
  );
}
