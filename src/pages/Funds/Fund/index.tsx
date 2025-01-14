import { MAX_EXPIRATION, type SingleFund } from "@better-giving/fundraiser";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import { RichText } from "components/RichText";
import Seo from "components/Seo";
import VerifiedIcon from "components/VerifiedIcon";
import { FundCreator } from "components/fundraiser";
import { FundStatus, statusFn } from "components/fundraiser";
import { Target, toTarget } from "components/target";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { unpack } from "helpers";
import { ArrowLeft } from "lucide-react";
import { Share } from "./share";
import { Video } from "./video";

export const loader: LoaderFunction = async ({ params }) => {
  return ap.get(`${ver(1)}/funds/${params.fundId}`).json();
};

export default function Fund() {
  const fund = useLoaderData() as SingleFund;

  const status = statusFn(
    fund.expiration ?? MAX_EXPIRATION,
    fund.active,
    fund.donation_total_usd
  );

  return (
    <section className="grid pb-10">
      <Seo
        title={`${fund.name} - ${APP_NAME}`}
        description={fund.description.slice(0, 140)}
        name={fund.name}
        image={fund.logo || flying_character}
        url={`${BASE_URL}/profile/${fund.id}`}
      />
      <div
        className="relative w-full h-52 sm:h-72 bg-cover bg-center overlay"
        style={{
          backgroundImage: `url('${fund.banner || fallback_banner}')`,
        }}
      />
      <div className="padded-container grid md:grid-cols-[3fr_2fr] gap-4">
        <div className="self-start -mt-12 md:-mt-24 z-10 grid gap-4 relative">
          <div className="absolute -top-8 flex justify-between w-full">
            <Link
              className="text-white flex items-center gap-x-1 active:-translate-x-1"
              to="../funds"
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

              <h4 className="md:col-start-2 max-md:text-center font-heading font-bold text-2xl w-full break-words">
                {fund.name}
              </h4>
              <p className="pl-0.5">
                <span className="text-sm font-medium text-navy-l3 mr-1">
                  by
                </span>
                <FundCreator
                  name={fund.creator_name}
                  id={fund.creator_id}
                  classes="font-medium text-navy inline"
                />
              </p>
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
                container: "mt-4 pt-4 border-t border-gray-l4",
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
        </div>
        <div className="md:-mt-24 md:sticky md:top-24 self-start flex flex-col content-start bg-white z-10 rounded-lg shadow-2xl shadow-black/10 p-4">
          <DonateSection
            {...fund}
            classes={{ container: "max-md:hidden", link: "mb-4 order-first" }}
          />

          <p className="text-navy-l1 mt-8 mb-2 font-bold uppercase text-xs">
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
                  className="aspect-[2/1] rounded-sm"
                  width={50}
                />
                <Link
                  to={`${appRoutes.marketplace}/${m.id}`}
                  className="font-bold font-heading text-navy-l1 hover:text-blue-d1"
                >
                  {m.name}
                </Link>
              </div>
            ))}
          </div>
          <Share recipientName={fund.name} className="mt-auto" />
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
interface IDonateSection extends SingleFund {
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
          target={toTarget(props.target)}
          classes={`${s.target} ${s.container} w-full`}
        />
      )}
      <Link
        aria-disabled={
          !statusFn(
            props.expiration ?? MAX_EXPIRATION,
            props.active,
            props.donation_total_usd
          ).active
        }
        to={appRoutes.donate_fund + `/${props.id}`}
        className={`w-full btn-blue px-6 py-3 text-sm ${s.link} ${s.container}`}
      >
        Donate now
      </Link>
    </>
  );
}
