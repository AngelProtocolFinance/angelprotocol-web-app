import Icon from "components/Icon";
import Image from "components/Image";
import Tooltip from "components/Tooltip";
import { appRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { isEmpty } from "helpers";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { EndowmentCard } from "types/aws";
import { UNSDG_NUMS } from "types/lists";

const PLACEHOLDER_TAGLINE = " ";

export default function Card({
  active_in_countries = [],
  name,
  card_img,
  logo,
  id,
  endow_designation,
  sdgs,
  tagline,
  hq_country,
  kyc_donors_only,
}: EndowmentCard) {
  return (
    <div className="relative overflow-clip dark:bg-blue-d6 rounded-lg border border-gray-l4 hover:border-blue dark:hover:border-blue">
      <div className="absolute top-[14px] left-[14px] right-[14px] flex justify-between gap-3">
        <p className="bg-blue-d1 text-white font-semibold text-2xs rounded-sm uppercase px-2 py-0.5 font-heading">
          {endow_designation}
        </p>
        {kyc_donors_only && <KYCIcon className="ml-auto" />}
      </div>
      <Link
        to={`${appRoutes.marketplace}/${id}`}
        className="grid grid-rows-[auto_1fr] h-full"
      >
        <Image
          loading="lazy"
          src={card_img || logo}
          className="h-40 w-full object-cover bg-blue-l4 dark:bg-blue-d2"
          onError={(e) => e.currentTarget.classList.add("bg-blue-l3")}
        />
        <div className="flex flex-col p-3 pb-4 gap-3">
          {/* nonprofit NAME */}
          <h3 className="text-ellipsis line-clamp-2">{name}</h3>
          {/* TAGLINE */}
          {tagline && tagline !== PLACEHOLDER_TAGLINE ? (
            <p className="peer text-navy-l1 dark:text-navy-l2 text-sm -mt-2">
              {tagline}
            </p>
          ) : null}
          {/* HQ & ACTIVE-IN COUNTRIES */}
          <div className="text-navy-l1 dark:text-navy-l2 text-sm">
            <p>
              <span className="font-semibold">HQ:</span> {hq_country}
            </p>
            <p className="line-clamp-2">
              <span className="font-semibold">Active in:</span>{" "}
              {isEmpty(active_in_countries)
                ? hq_country
                : active_in_countries.join(" ,")}
            </p>
          </div>
          <div className="mt-auto empty:hidden grid gap-3">
            {/** UN SDGs - always on bottom */}
            {!isEmpty(sdgs) && (
              <div className="flex flex-wrap text-3xs font-bold uppercase gap-1 h-max-[40px]">
                {sdgs.map((s) => (
                  <SDG num={s} key={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

function SDG({ num }: { num: UNSDG_NUMS }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Tooltip anchorRef={ref} content={unsdgs[num].title} />
      <div
        ref={ref}
        className="whitespace-nowrap bg-blue-l4 hover:bg-blue-l3 dark:bg-blue-d4 hover:dark:bg-blue-d3 px-1 py-1 border border-gray-l4 rounded-lg"
      >
        SDG #{num}
      </div>
    </>
  );
}

function KYCIcon({ className = "" }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Tooltip anchorRef={ref} content="Verification Required" />
      <div ref={ref} className={className}>
        <Icon
          type="AdminPanel"
          size={20}
          className="text-white hover:text-orange cursor-pointer"
        />
      </div>
    </>
  );
}
