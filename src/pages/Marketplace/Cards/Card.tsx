import { useRef } from "react";
import { Link } from "react-router-dom";
import { EndowmentProfile } from "types/aws";
import { UNSDG_NUMS } from "types/lists";
import BookmarkBtn from "components/BookmarkBtn";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import { isEmpty } from "helpers";
import { appRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";

const PLACEHOLDER_CITY = "City";
const PLACEHOLDER_TAGLINE = " ";

export default function Card({
  active_in_countries,
  name,
  logo,
  image,
  id,
  endow_type,
  categories: { sdgs },
  tagline,
  hq: { country = "", city = "" },
  kyc_donors_only,
}: EndowmentProfile) {
  return (
    <div className="relative overflow-clip dark:bg-blue-d6 rounded-lg border border-gray-l2 dark:border-bluegray hover:border-blue dark:hover:border-blue">
      <div className="absolute top-[14px] left-[14px] right-[14px] flex justify-between gap-3">
        <p className="bg-orange-l1 text-white font-semibold text-2xs rounded-sm uppercase px-2 py-0.5 font-heading">
          {endow_type === "Charity" ? "Non-profit" : "For-profit"}
        </p>
        {kyc_donors_only && <KYCIcon className="ml-auto" />}
        <BookmarkBtn name={name} endowId={id} logo={logo} />
      </div>
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="grid grid-rows-[auto_1fr] h-full"
      >
        <img
          loading="lazy"
          src={image}
          className="h-40 w-full object-cover bg-blue-l4 dark:bg-blue-d2"
          alt=""
          onError={(e) => {
            e.currentTarget.classList.add("bg-blue-l3");
          }}
        />
        <div className="flex flex-col p-3 pb-4 gap-3">
          <h3 className="font-bold">{name}</h3>
          {country && (
            <p className="text-gray-d1 dark:text-gray text-sm -mt-2">
              <span className="font-semibold">HQ:</span> {country}
              {city && city !== PLACEHOLDER_CITY ? `, ${city}` : ""}
            </p>
          )}

          {tagline && tagline !== PLACEHOLDER_TAGLINE ? (
            <p className="peer text-gray-d1 dark:text-gray text-sm last:mb-0">
              {tagline}
            </p>
          ) : null}
          {/** country and sdg always on bottom */}
          <div className="mt-auto empty:hidden grid gap-3">
            {!isEmpty(active_in_countries) && (
              <p className="text-gray-d1 dark:text-gray text-sm">
                <span className="font-semibold">Active in:</span>{" "}
                {active_in_countries.join(" ,")}
              </p>
            )}
            {!isEmpty(sdgs) && (
              <div className="flex text-3xs font-bold uppercase gap-1">
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
        className="flex items-center bg-blue-l4 hover:bg-blue-l3 dark:bg-blue-d4 hover:dark:bg-blue-d3 h-4 px-1 py-1 border border-gray-l2 dark:border-bluegray rounded-lg"
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
