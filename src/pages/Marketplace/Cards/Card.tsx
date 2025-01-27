import { NavLink } from "@remix-run/react";
import flying_character from "assets/images/flying-character.webp";
import BookmarkBtn from "components/bookmark-btn";
import Image from "components/image";
import { Target, toTarget } from "components/target";
import VerifiedIcon from "components/verified-icon";
import { appRoutes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";
import type { EndowmentCard } from "types/aws";

const PLACEHOLDER_TAGLINE = " ";

export default function Card({
  name,
  card_img,
  id,
  tagline,
  claimed,
  contributions_total,
  target,
}: EndowmentCard) {
  const user = useRootData();
  return (
    <div className="relative [&:has(.pending)]:grayscale [&:has(.pending)]:pointer-events-none  grid grid-rows-subgrid row-span-4 gap-y-0">
      <NavLink
        to={`${appRoutes.marketplace}/${id}`}
        className="grid grid-rows-subgrid row-span-4 h-full overflow-clip rounded-lg border border-gray-l4 hover:border-blue-d1"
      >
        <Image
          loading="lazy"
          src={card_img || flying_character}
          className="h-40 w-full object-cover bg-blue-l4 dark:bg-blue-d2"
          onError={(e) => e.currentTarget.classList.add("bg-blue-l3")}
        />
        <div className="grid grid-rows-subgrid row-start-2 row-span-3 p-3 pb-16 gap-3">
          {/* nonprofit NAME */}
          <h3 className="text-ellipsis line-clamp-2 text-center mb-2">
            {claimed && (
              <VerifiedIcon
                classes="inline relative bottom-px mr-1"
                size={21}
              />
            )}
            <span className="inline">{name}</span>
          </h3>

          {/* TAGLINE */}
          {tagline && tagline !== PLACEHOLDER_TAGLINE ? (
            <p className="peer text-navy-l1 dark:text-navy-l2 text-sm -mt-2 mb-4">
              {tagline}
            </p>
          ) : (
            <div />
          )}

          {target && (
            <Target progress={contributions_total} target={toTarget(target)} />
          )}
        </div>
      </NavLink>
      {/** absolute so above whole `Link` card */}
      <div className="absolute grid grid-cols-[1fr_auto_1fr] mt-2 bottom-4 left-4 right-4">
        <div /> {/** future: share button  */}
        <NavLink
          to={`${appRoutes.donate}/${id}`}
          className="btn-blue px-4 py-1 rounded-full text-sm normal-case"
        >
          Donate
        </NavLink>
        <BookmarkBtn user={user} endowId={id} classes="justify-self-end" />
      </div>
    </div>
  );
}
