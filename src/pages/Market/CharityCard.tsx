import LazyImage from "components/LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { app, charity, site } from "constants/routes";
import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";
import { Profile } from "services/aws/endowments/types";

export default function CharityCard(props: Profile) {
  return (
    <Link
      to={`${site.app}/${app.charity}/${props.endowment_address}/${charity.index}`}
      className="relative w-72 flex-none break-words rounded-2xl hover:shadow-3xl cursor-pointer mb-4 mx-2 p-2"
    >
      <LazyImage
        classes="bg-white rounded-lg img-no-drag w-full h-32 object-cover"
        src={props.charity_image}
        alt="charity banner"
        width="272"
        height="128"
        rounded
      />
      <p className="block cursor-pointer font-heading text-white-grey hover:text-angel-orange font-bold text-sm uppercase mt-1.5">
        {props.charity_name}
      </p>
      <div className="line-clamp-2 text-sm text-white-grey/80">
        <RichTextRenderer text={props.charity_overview} />
      </div>
    </Link>
  );
}
