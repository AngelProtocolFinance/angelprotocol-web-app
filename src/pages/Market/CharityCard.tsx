import { Link } from "react-router-dom";
import { Profile } from "types/server/aws";
import defaultBanner from "assets/images/home-banner.jpg";
import LazyImage from "components/LazyImage";
import { appRoutes, siteRoutes } from "constants/routes";

export default function CharityCard(props: Profile) {
  return (
    <Link
      to={`${siteRoutes.app}/${appRoutes.charity}/${props.endowment_address}`}
      className="relative rounded-md hover:shadow-lg hover:bg-bright-blue/10 transform transition ease-in hover:scale-[1.02] cursor-pointer"
    >
      <LazyImage
        classes="mt-2 mx-2 w-64 h-32 bg-white rounded-lg img-no-drag object-cover object-center rounded-md"
        src={props.charity_image || defaultBanner}
        alt="charity banner"
      />
      <div className="mx-2 w-64 cursor-pointer font-heading text-white-grey font-bold text-sm uppercase my-2.5">
        {props.charity_name}
      </div>
    </Link>
  );
}
