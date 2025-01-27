import { Link } from "@remix-run/react";
import flying_character from "assets/images/flying-character.webp";
import ContentLoader from "components/content-loader";
import Image from "components/image";
import { appRoutes } from "constants/routes";
import type { EndowmentCard } from "types/aws";

const Card = (props: EndowmentCard) => {
  return (
    <div className="grid rounded-4xl bg-white h-[27rem] border border-gray-l4/30 shadow-xs shadow-black/5">
      <Image
        src={props.card_img || flying_character}
        alt="card image"
        height={224}
        className="object-cover w-full rounded-t-4xl h-56"
      />
      <h4 className="text-[#0D283A] font-bold text-xl whitespace-nowrap text-ellipsis px-8 mt-4 overflow-hidden">
        {props.name}
      </h4>

      <div>
        <p className="px-8 text-[#0D283A] line-clamp-2">{props.tagline}</p>
      </div>

      <Link
        to={`${appRoutes.donate}/${props.id}`}
        className="my-4 justify-self-center self-end rounded-[40px] py-2 px-7 border-2 border-solid border-blue-d1 text-blue-d1 font-semibold font-heading"
      >
        Donate
      </Link>
    </div>
  );
};

export const Skeleton = () => (
  <ContentLoader className="h-[27rem] rounded-4xl" />
);

export default Card;
