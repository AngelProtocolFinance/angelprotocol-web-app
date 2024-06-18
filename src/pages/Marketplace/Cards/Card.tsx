import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import VerifiedIcon from "components/VerifiedIcon";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import type { EndowmentCard } from "types/aws";

const PLACEHOLDER_TAGLINE = " ";

export default function Card({
  name,
  card_img,
  id,
  tagline,
  claimed,
}: EndowmentCard) {
  return (
    <div className="relative overflow-clip dark:bg-blue-d6 rounded-lg border border-gray-l4 hover:border-blue dark:hover:border-blue">
      <Link
        to={`${appRoutes.marketplace}/${id}`}
        className="grid grid-rows-[auto_1fr] h-full"
      >
        <Image
          loading="lazy"
          src={card_img || flying_character}
          className="h-40 w-full object-cover bg-blue-l4 dark:bg-blue-d2"
          onError={(e) => e.currentTarget.classList.add("bg-blue-l3")}
        />
        <div className="flex flex-col p-3 pb-4 gap-3">
          {/* nonprofit NAME */}
          <h3 className="text-ellipsis line-clamp-2">
            {claimed && (
              <VerifiedIcon
                classes="inline relative bottom-px mr-1"
                size={18}
              />
            )}
            <span className="inline">{name}</span>
          </h3>

          {/* TAGLINE */}
          {tagline && tagline !== PLACEHOLDER_TAGLINE ? (
            <p className="peer text-navy-l1 dark:text-navy-l2 text-sm -mt-2">
              {tagline}
            </p>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
