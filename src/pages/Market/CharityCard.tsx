import LazyImage from "components/LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { app, charity, site } from "constants/routes";
import { Profile } from "services/aws/endowments/types";

export default function CharityCard(props: Profile) {
  return (
    <Link
      to={`${site.app}/${app.charity}/${props.endowment_address}/${charity.overview}`}
      className="relative rounded-md hover:shadow-lg hover:bg-bright-blue/10 transform transition ease-in hover:scale-[1.02] cursor-pointer"
    >
      <LazyImage
        classes="mt-2 mx-2 w-64 h-32 bg-white rounded-lg img-no-drag object-cover object-center rounded-md"
        src={props.charity_image}
        alt="charity banner"
      />
      <div className="mx-2 w-64 cursor-pointer font-heading text-white-grey font-bold text-md uppercase mt-1.5">
        {props.charity_name}
      </div>
    </Link>
  );
}
