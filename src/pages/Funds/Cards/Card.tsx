import type { FundItem } from "@better-giving/fundraiser";
import { NavLink } from "@remix-run/react";
import flying_character from "assets/images/flying-character.webp";
import Image from "components/Image";
import { toText } from "components/RichText";
import VerifiedIcon from "components/VerifiedIcon";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";

export default function Card({
  name,
  logo,
  banner,
  id,
  description,
  verified,
  donation_total_usd,
  target,
}: FundItem) {
  return (
    <div className="relative [&:has(.pending)]:grayscale [&:has(.pending)]:pointer-events-none grid grid-rows-subgrid row-span-4">
      <NavLink
        to={`${appRoutes.funds}/${id}`}
        className="grid grid-rows-subgrid row-span-4 h-full overflow-clip rounded-lg border border-gray-l4 hover:border-blue-d1"
      >
        <div className="aspect-4/1 w-full relative">
          <Image
            loading="lazy"
            src={banner}
            className="w-full h-full object-cover bg-blue-l4"
            onError={(e) => e.currentTarget.classList.add("bg-blue-l3")}
          />
          <Image
            width={60}
            height={60}
            loading="lazy"
            src={logo || flying_character}
            className="absolute bottom-0 translate-y-1/2 z-10 left-3 rounded-full border-2 border-blue-d1 shadow-2xl shadow-black/20"
            onError={(e) => e.currentTarget.classList.add("bg-blue-l3")}
          />
          {verified && (
            <div className="absolute bottom-0  translate-y-1/2 z-10 left-20">
              <VerifiedIcon
                classes="inline relative bottom-px mr-1"
                size={22}
              />
            </div>
          )}
        </div>

        <div className="grid grid-rows-subgrid row-span-3 p-3 pb-16 gap-3">
          {/* nonprofit NAME */}
          <h3 className="text-ellipsis line-clamp-2 mt-4 -mb-2">
            <span className="inline">{name}</span>
          </h3>

          <p className="peer text-navy-l1 dark:text-navy-l2 text-sm line-clamp-3 mb-4">
            {toText(description)}
          </p>

          <Target target={toTarget(target)} progress={donation_total_usd} />
        </div>
      </NavLink>
      {/** absolute so above whole `Link` card */}
      <div className="absolute grid grid-cols-[1fr_auto_1fr] mt-2 bottom-4 left-4 right-4">
        <div /> {/** future: share button  */}
        <NavLink
          to={`${appRoutes.donate_fund}/${id}`}
          className="btn-blue px-4 py-1 rounded-full text-sm normal-case"
        >
          Donate
        </NavLink>
        <div /> {/** future: bookmark button  */}
      </div>
    </div>
  );
}
