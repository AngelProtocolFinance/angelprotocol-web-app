import flying_character from "assets/images/flying-character.png";
import BookmarkBtn from "components/BookmarkBtn";
import Image from "components/Image";
import VerifiedIcon from "components/VerifiedIcon";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import { Link, useRouteLoaderData } from "react-router-dom";
import type { DetailedUser } from "types/auth";
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
  const user = useRouteLoaderData("root") as DetailedUser | null;
  return (
    <div className="relative grid grid-rows-subgrid row-span-4 gap-y-0">
      <Link
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
      </Link>
      {/** absolute so above whole `Link` card */}
      <div className="absolute grid grid-cols-[1fr_auto_1fr] mt-2 bottom-4 left-4 right-4">
        <div /> {/** future: share button  */}
        <Link
          to={`${appRoutes.donate}/${id}`}
          className="btn-blue px-4 py-1 rounded-full text-sm normal-case"
        >
          Donate
        </Link>
        <BookmarkBtn user={user} endowId={id} classes="justify-self-end" />
      </div>
    </div>
  );
}
