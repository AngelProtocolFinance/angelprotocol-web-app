import { Link } from "react-router-dom";
import { EndowmentEntry } from "types/server/contracts";
import defaultBanner from "assets/images/home-banner.jpg";
import LazyImage from "components/LazyImage";
import { appRoutes, siteRoutes } from "constants/routes";

export default function CharityCard(props: EndowmentEntry) {
  return (
    <Link
      to={`${appRoutes.charity}/${props.address}`}
      className="relative rounded-md hover:shadow-lg hover:bg-bright-blue/10 transform transition ease-in hover:scale-[1.02] cursor-pointer"
    >
      <LazyImage
        classes="mt-2 mx-2 w-64 h-32 bg-white rounded-lg img-no-drag object-cover object-center rounded-md"
        src={props.image || defaultBanner}
        alt="charity banner"
      />
      <div className="mx-2 w-64 cursor-pointer font-heading text-white-grey font-bold text-sm uppercase my-2.5">
        {props.name}
      </div>
    </Link>
  );
}
