import LazyImage from "components/LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { app, site } from "constants/routes";
import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";
import { AWSCharityProfile } from "services/aws/endowments/types";

export default function CharityCard(props: AWSCharityProfile) {
  return (
    <Link
      to={`${site.app}/${app.charity}/${props.endowment_address}`}
      className="relative rounded-md hover:shadow-lg hover:bg-bright-blue/10 transform transition ease-in hover:scale-[1.02] cursor-pointer"
    >
      <LazyImage
        classes="mt-2 mx-2 w-64 h-32 bg-white rounded-lg img-no-drag object-cover object-center rounded-md"
        src={props.charity_image}
        alt="charity banner"
      />
      <div className="mx-2 w-64 cursor-pointer font-heading text-white-grey font-bold text-md uppercase mt-2">
        {props.charity_name}
      </div>
    </Link>
  );
}
