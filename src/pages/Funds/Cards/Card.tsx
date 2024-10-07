import type { FundItem } from "@better-giving/fundraiser";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import VerifiedIcon from "components/VerifiedIcon";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { Progress } from "./Progress";

export default function Card({
  name,
  logo,
  id,
  description,
  verified,
  donation_total_usd,
  target,
}: FundItem) {
  return (
    <div className="relative grid grid-rows-subgrid row-span-4">
      <Link
        to={`${appRoutes.funds}/${id}`}
        className="grid grid-rows-subgrid row-span-4 h-full overflow-clip rounded-lg border border-gray-l4 hover:border-blue-d1"
      >
        <Image
          loading="lazy"
          src={logo || flying_character}
          className="h-40 w-full object-cover bg-blue-l4 dark:bg-blue-d2"
          onError={(e) => e.currentTarget.classList.add("bg-blue-l3")}
        />
        <div className="grid grid-rows-subgrid row-span-3 p-3 pb-16 gap-3">
          {/* nonprofit NAME */}
          <h3 className="text-ellipsis line-clamp-2 text-center mb-2">
            {verified && (
              <VerifiedIcon
                classes="inline relative bottom-px mr-1"
                size={18}
              />
            )}
            <span className="inline">{name}</span>
          </h3>

          <p className="peer text-navy-l1 dark:text-navy-l2 text-sm line-clamp-3 mb-4">
            {description}
          </p>

          <Progress target={target} donation_total_usd={donation_total_usd} />
        </div>
      </Link>
      {/** absolute so above whole `Link` card */}
      <div className="absolute grid grid-cols-[1fr_auto_1fr] mt-2 bottom-4 left-4 right-4">
        <div /> {/** future: share button  */}
        <Link
          to={`${appRoutes.donate}/${id}`}
          className="btn-blue px-4 py-1 rounded-full text-sm normal-case"
        >
          WIP: Donate
        </Link>
        <div /> {/** future: bookmark button  */}
      </div>
    </div>
  );
}
