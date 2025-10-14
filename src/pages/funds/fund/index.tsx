import { MAX_EXPIRATION_ISO } from "@better-giving/fundraiser/schema";
import fallback_banner from "assets/images/bg-banner.webp";
import flying_character from "assets/images/flying-character.webp";
import { DonorMsgs } from "components/donor-msgs";
import { FundCreator } from "components/fundraiser";
import { FundStatus, status_fn } from "components/fundraiser";
import { Image } from "components/image";
import { RichText, richtext_styles, toText } from "components/rich-text";
import { Target, to_target } from "components/target";
import { VerifiedIcon } from "components/verified-icon";
import { APP_NAME, BASE_URL } from "constants/env";
import { metas } from "helpers/seo";
import { unpack } from "helpers/unpack";
import { ArrowLeft } from "lucide-react";
import { Link, NavLink, href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { IFund } from "types/fund";
import type { Route } from "./+types";
import { Share } from "./share";
import { Video } from "./video";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export const links: Route.LinksFunction = () => [...richtext_styles];

export const meta: Route.MetaFunction = ({ loaderData: d, location: l }) => {
  if (!d) return [];
  return metas({
    title: `${d.name} - ${APP_NAME}`,
    description: toText(d.description).slice(0, 140),
    name: d.name,
    image: d.banner || flying_character,
    url: `${BASE_URL}/${l.pathname}`,
  });
};
export { ErrorBoundary } from "components/error";
export default CacheRoute(Fund);

function Fund({ loaderData }: Route.ComponentProps) {
  const { url, ...fund } = loaderData;

  const status = status_fn(
    fund.expiration ?? MAX_EXPIRATION_ISO,
    fund.active,
    fund.donation_total_usd
  );

  return (
    <section className="grid pb-10">
      <div
        className="relative w-full h-52 sm:h-72 bg-cover bg-center peer overlay"
        style={{
          backgroundImage: `url('${fund.banner || fallback_banner}')`,
        }}
      />
      <div className="group peer-hover:[&>div]:mt-1 xl:container xl:mx-auto px-5 grid md:grid-cols-[3fr_2fr] gap-4">
        <div className="self-start -mt-12 md:-mt-24 transition-[margin] ease-in-out z-10 grid gap-4 relative">
          <div className="absolute -top-8 flex items-center justify-between w-full">
            <Link
              className="text-white flex items-center gap-x-1 active:-translate-x-1"
              to="../fundraisers"
            >
              <ArrowLeft size={16} />
              <span>Fundraisers</span>
            </Link>

            <FundStatus
              status={status}
              classes={{
                container: "px-3 py-1 rounded-full text-xs",
                active: "bg-white",
                inactive: "bg-red-l4 text-red",
                completed: "bg-green-l4 text-green",
                expired: "bg-gray-l4 text-gray",
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow-2xl shadow-black/10 p-4">
            <div className="grid max-md:gap-y-4 items-center max-md:justify-items-center md:grid-cols-[auto_1fr]">
              <div className="mr-4 md:row-span-2 relative">
                <Image
                  src={fund.logo || flying_character}
                  width={60}
                  className="rounded-full object-cover bg-white"
                />
                {fund.verified && (
                  <VerifiedIcon
                    classes="absolute bottom-0 -right-2"
                    size={22}
                  />
                )}
              </div>

              <h4 className="md:col-start-2 max-md:text-center  font-semibold text-2xl w-full break-words">
                {fund.name}
              </h4>
              <div className="pl-0.5">
                <span className="text-sm  text-gray mr-1">by</span>
                <FundCreator
                  name={fund.creator_name}
                  id={fund.creator_id}
                  classes=" text-gray-d1 inline"
                />
              </div>
              <DonateSection
                {...fund}
                classes={{
                  container: "col-span-full md:hidden",
                  target: "mt-8",
                }}
              />
            </div>
            <RichText
              content={{
                value: fund.description ?? "",
              }}
              classes={{
                field: "",
                container: "mt-4 pt-4 border-t border-gray-l3",
              }}
              readOnly
            />
          </div>

          {fund.videos.map((v, idx) => (
            <div
              key={idx}
              className="rounded-lg shadow-2xl shadow-black/10 mt-4"
            >
              <Video url={v} />
            </div>
          ))}

          <DonorMsgs id={fund.id} classes="mt-4" />
        </div>
        <div
          id="info-card"
          className="-mt-24 transition-[margin] ease-in-out md:sticky md:top-24 self-start flex flex-col content-start bg-white shadow-2xl shadow-black/10 z-10 rounded-lg  p-4"
        >
          <DonateSection
            {...fund}
            classes={{ container: "max-md:hidden", link: "mb-4 order-first" }}
          />

          <p className="text-gray mt-8 mb-2 font-semibold uppercase text-xs">
            Donations go to
          </p>
          <div className="grid gap-y-4 mb-4 grid-cols-[auto_1fr]">
            {fund.members.map((m) => (
              <div
                key={m.id}
                className="grid items-center gap-x-2 grid-cols-subgrid col-span-2"
              >
                <Image
                  src={m.logo}
                  className="aspect-2/1 rounded-xs"
                  width={50}
                />
                <Link
                  to={href("/marketplace/:id", { id: m.id.toString() })}
                  className="font-semibold  text-gray hover:text-blue-d1"
                >
                  {m.name}
                </Link>
              </div>
            ))}
          </div>
          <Share recipientName={fund.name} url={url} className="mt-auto" />
        </div>
      </div>
    </section>
  );
}

interface Classes {
  container?: string;
  link?: string;
  target?: string;
}
interface IDonateSection extends IFund {
  classes?: Classes | string;
}
function DonateSection(props: IDonateSection) {
  const s = unpack(props.classes);
  return (
    <>
      {props.target && (
        <Target
          text={<Target.Text classes="mb-2" />}
          progress={props.donation_total_usd}
          target={to_target(props.target)}
          classes={`${s.target} ${s.container} w-full`}
        />
      )}
      <NavLink
        aria-disabled={
          !status_fn(
            props.expiration ?? MAX_EXPIRATION_ISO,
            props.active,
            props.donation_total_usd
          ).active
        }
        to={href("/donate-fund/:fundId", { fundId: props.id })}
        className={`w-full btn btn-blue px-6 py-3 text-sm ${s.link} ${s.container}`}
      >
        Donate now
      </NavLink>
    </>
  );
}
