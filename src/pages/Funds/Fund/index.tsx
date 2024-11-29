import type { SingleFund } from "@better-giving/fundraiser";
import { skipToken } from "@reduxjs/toolkit/query";
import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import { RichText } from "components/RichText";
import Seo from "components/Seo";
import VerifiedIcon from "components/VerifiedIcon";
import { FundCreator } from "components/fundraiser";
import { Target, toTarget } from "components/target";
import { APP_NAME, BASE_URL } from "constants/env";
import { appRoutes } from "constants/routes";
import { unpack } from "helpers";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useFundQuery } from "services/aws/funds";
import PageError from "./PageError";
import Skeleton from "./Skeleton";
import { Share } from "./share";
import { Video } from "./video";

const isClosed = (active: boolean, expiration?: string): boolean => {
  const isExpired = expiration ? expiration < new Date().toISOString() : false;
  return !active || isExpired;
};

export function Component() {
  const { fundId = "" } = useParams();
  const { isLoading, isError, data } = useFundQuery(fundId || skipToken);

  if (isLoading) return <Skeleton />;
  if (isError || !data) return <PageError />;

  return (
    <section className="grid pb-10">
      <Seo
        title={`${data.name} - ${APP_NAME}`}
        description={data.description.slice(0, 140)}
        name={data.name}
        image={data.logo || flying_character}
        url={`${BASE_URL}/profile/${data.id}`}
      />
      <div
        className="relative w-full h-52 sm:h-72 bg-cover bg-center overlay"
        style={{
          backgroundImage: `url('${data.banner || fallback_banner}')`,
        }}
      />
      <div className="padded-container grid md:grid-cols-[3fr_2fr] gap-4">
        <div className="self-start -mt-12 md:-mt-24 z-10 grid gap-4 relative">
          <Link
            className="absolute -top-8 text-white flex items-center gap-x-1 active:-translate-x-1"
            to=".."
          >
            <ArrowLeft size={16} />
            <span>Fundraisers</span>
          </Link>
          <div className="bg-white rounded-lg shadow-2xl shadow-black/10 p-4">
            <div className="grid max-md:gap-y-4 items-center max-md:justify-items-center md:grid-cols-[auto_1fr]">
              <Image
                src={data.logo || flying_character}
                width={60}
                className="mr-4 md:row-span-2 border-2 border-blue-d1 rounded-full object-cover bg-white"
              />
              <div className="md:col-start-2 max-md:text-center">
                {data.verified && (
                  <VerifiedIcon classes="relative inline bottom-1" size={20} />
                )}
                <span className="font-heading font-bold text-2xl w-full break-words text-center">
                  {data.name}
                </span>
                {isClosed(data.active, data.expiration) && (
                  <span className="ml-2 px-3 py-1 text-2xs bg-red-l4 text-red relative inline bottom-1 uppercase rounded-full">
                    closed
                  </span>
                )}
              </div>
              <p>
                <span className="text-sm font-medium text-navy-l1 mr-1">
                  created by:
                </span>
                <FundCreator
                  name={data.creator_name}
                  id={data.creator_id}
                  classes="font-medium text-navy inline"
                />
              </p>
              <DonateSection
                {...data}
                classes={{
                  container: "col-span-full md:hidden",
                  target: "mt-8",
                }}
              />
            </div>
            <RichText
              content={{
                value: data.description ?? "",
              }}
              classes={{
                field: "",
                container: "mt-4 pt-4 border-t border-gray-l4",
              }}
              readOnly
            />
          </div>

          {data.videos.map((v, idx) => (
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
            {...data}
            classes={{ container: "max-md:hidden", link: "mb-4 order-first" }}
          />

          <p className="text-navy-l1 mt-8 mb-2 font-bold uppercase text-xs">
            Donations go to
          </p>
          <div className="grid gap-y-4 mb-4 grid-cols-[auto_1fr]">
            {data.members.map((m) => (
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
          <Share recipientName={data.name} className="mt-auto" />
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
        aria-disabled={isClosed(props.active, props.expiration)}
        to={appRoutes.donate_fund + `/${props.id}`}
        className={`w-full btn-blue px-6 py-3 text-sm ${s.link} ${s.container}`}
      >
        Donate now
      </Link>
    </>
  );
}
