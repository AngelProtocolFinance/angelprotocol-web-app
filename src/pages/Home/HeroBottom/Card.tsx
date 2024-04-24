import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { EndowmentCard } from "types/aws";

const Card = (props: EndowmentCard) => {
  return (
    <div className="grid shadow-xl rounded-xl bg-white">
      <Image
        src={props.card_img || props.logo}
        alt="logo"
        className="object-cover w-full rounded-t-xl h-52"
      />
      <h4 className="text-[#0D283A] font-bold text-xl whitespace-nowrap text-ellipsis px-8 mt-4">
        {props.name}
      </h4>

      <p className="px-8 text-[#0D283A] line-clamp-2 h-14">{props.tagline}</p>

      <Link
        to={`${appRoutes.marketplace}/${props.id}`}
        className="my-4 justify-self-center rounded-[40px] py-2 px-7 border-2 border-solid border-blue-d1 text-blue-d1 font-semibold font-heading"
      >
        Donate
      </Link>
    </div>
  );
};

export default Card;
