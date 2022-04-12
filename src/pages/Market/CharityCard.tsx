import LazyImage from "components/LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { app, site } from "constants/routes";
import { EndowmentEntry } from "services/terra/registrar/types";
import image from "assets/images/home-banner.jpg";

export default function CharityCard(props: EndowmentEntry) {
  return (
    <Link
      to={`${site.app}/${app.charity}/${props.address}`}
      className="relative rounded-md hover:shadow-lg hover:bg-bright-blue/10 transform transition ease-in hover:scale-[1.02] cursor-pointer"
    >
      <LazyImage
        classes="mt-2 mx-2 w-64 h-32 bg-white rounded-lg img-no-drag object-cover object-center rounded-md"
        src={image}
        alt="charity banner"
      />
      <div className="mx-2 w-64 cursor-pointer font-heading text-white-grey font-bold text-sm uppercase mt-1.5">
        {props.name}
      </div>
    </Link>
  );
}
