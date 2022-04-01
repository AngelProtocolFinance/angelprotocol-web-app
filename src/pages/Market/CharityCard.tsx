import LazyImage from "components/LazyImage/LazyImage";
import { Link } from "react-router-dom";
import { app, charity, site } from "constants/routes";
import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";
import { Profile } from "services/aws/endowments/types";

export default function CharityCard(props: Profile) {
  return (
    <Link
      to={`${site.app}/${app.charity}/${props.endowment_address}/${charity.overview}`}
      className="relative flex-none break-words rounded-2xl hover:shadow-3xl cursor-pointer p-2"
    >
      <LazyImage
        classes="bg-white rounded-lg img-no-drag w-64 h-32 object-cover rounded-md"
        src={props.charity_image}
        alt="charity banner"
      />
      <div className="cursor-pointer font-heading text-white-grey hover:text-angel-orange font-bold text-sm uppercase mt-1.5">
        <span className="break-words">{props.charity_name}</span>
      </div>
      <div className="w-64 line-clamp-2 text-sm text-white-grey/80">
        <RichTextRenderer text={props.charity_overview} />
      </div>
    </Link>
  );
}
