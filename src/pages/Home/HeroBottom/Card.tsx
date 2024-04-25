import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { EndowmentCard } from "types/aws";

const Card = (props: EndowmentCard) => {
  return (
    <div className="grid rounded-4xl bg-white h-[27rem] border border-gray-l4/30 shadow-sm shadow-black/5">
      <Image
        src={props.logo || props.card_img}
        alt="logo"
        className="object-cover w-full rounded-t-4xl h-56"
      />
      <h4 className="text-[#0D283A] font-bold text-xl whitespace-nowrap text-ellipsis px-8 mt-4 overflow-hidden">
        {props.name}
      </h4>

      <div>
        <p className="px-8 text-[#0D283A] line-clamp-2">{props.tagline}</p>
      </div>

      <Link
        to={`${appRoutes.marketplace}/${props.id}`}
        className="my-4 justify-self-center self-end rounded-[40px] py-2 px-7 border-2 border-solid border-blue-d1 text-blue-d1 font-semibold font-heading"
      >
        Donate
      </Link>
    </div>
  );
};

export default Card;
