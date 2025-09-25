import flying_character from "assets/images/flying-character.webp";
import { BookmarkBtn } from "components/bookmark-btn";
import { Image } from "components/image";
import { ShareButton } from "components/share-btn";
import { Target, toTarget } from "components/target";
import { VerifiedIcon } from "components/verified-icon";
import { BASE_URL } from "constants/env";
import { app_routes } from "constants/routes";
import { useRootData } from "hooks/use-root-data";
import { NavLink } from "react-router";
import type { EndowmentCard } from "types/npo";

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
        to={`${app_routes.marketplace}/${id}`}
        className="grid grid-rows-subgrid row-span-4 h-full overflow-clip rounded-lg border border-gray-l3 hover:border-blue-d1"
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
            <p className="peer text-gray dark:text-gray text-sm -mt-2 mb-4">
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
      <div className="absolute grid grid-cols-[1fr_auto_1fr] items-center mt-2 bottom-4 left-4 right-4">
        <ShareButton
          orgName={name}
          url={`${BASE_URL}${app_routes.marketplace}/${id}`}
          classes=""
        />
        <NavLink
          to={`${app_routes.donate}/${id}`}
          className="btn btn-blue px-4 py-1 rounded-full text-sm normal-case"
        >
          Donate
        </NavLink>
        <BookmarkBtn user={user} endowId={id} classes="justify-self-end" />
      </div>
    </div>
  );
}
