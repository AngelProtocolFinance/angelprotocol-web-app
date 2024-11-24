import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";

import { skipToken } from "@reduxjs/toolkit/query";
import { RichText } from "components/RichText";
import VerifiedIcon from "components/VerifiedIcon";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import { Link, useParams } from "react-router-dom";
import { useFundQuery } from "services/aws/funds";
import { FundContext } from "./FundContext";
import PageError from "./PageError";
import Skeleton from "./Skeleton";
import { Share } from "./share";

export function Component() {
  const { fundId = "" } = useParams();
  const { isLoading, isError, data } = useFundQuery(fundId || skipToken);

  if (isLoading) return <Skeleton />;
  if (isError || !data) return <PageError />;

  return (
    <FundContext.Provider value={data}>
      <Seo
        title={`${data.name} - ${APP_NAME}`}
        description={data.description.slice(0, 140)}
        name={data.name}
        image={data.logo || flying_character}
        url={`${BASE_URL}/profile/${data.id}`}
      />
      <section className="grid pb-10">
        <div
          className="relative w-full h-52 sm:h-72 bg-cover bg-center overlay"
          style={{
            backgroundImage: `url('${data.banner || fallback_banner}')`,
          }}
        />
        <div className="padded-container grid content-start md:grid-cols-[3fr_2fr] -mt-48 gap-4">
          <div className="md:-mt-24 bg-white z-10 rounded-lg shadow-2xl shadow-black/10 p-4">
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
                {!data.active && (
                  <span className="ml-2 px-3 py-1 text-2xs bg-red-l4 text-red relative inline bottom-1 uppercase rounded-full">
                    closed
                  </span>
                )}
              </div>
              <p>
                <span className="text-sm font-medium text-navy-l1 mr-1">
                  created by:
                </span>
                <span className="font-medium text-navy">
                  {data.creator || "dev@placeholder.com"}
                </span>
              </p>
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
          <div className="md:-mt-24 md:sticky md:top-24 self-start flex flex-col content-start bg-white z-10 rounded-lg shadow-2xl shadow-black/10 p-4">
            <Link
              to={appRoutes.donate_fund + `/${data.id}`}
              className="w-full btn-blue px-6 py-3 mb-4 text-sm"
            >
              Donate now
            </Link>
            {data.target && (
              <Target
                text={<Target.Text classes="mb-2" />}
                progress={data.donation_total_usd}
                target={toTarget(data.target)}
              />
            )}

            <p className="text-navy-l1 mt-8 mb-2 font-bold uppercase text-xs">
              Donations go to
            </p>
            <div className="grid gap-y-4 mb-4">
              {data.members.map((m) => (
                <div key={m.id} className="flex items-center gap-x-2">
                  <Image
                    src={m.logo}
                    className="aspect-square rounded-full border-2 border-blue-d1"
                    width={40}
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
    </FundContext.Provider>
  );
}
