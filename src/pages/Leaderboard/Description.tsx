import { Link } from "react-router-dom";
import { Endowment } from "services/aws/leaderboard/types";
import { charity_details } from "services/aws/endowments/placeholders";
import { app } from "types/routes";
import LazyImage from "components/LazyImage/LazyImage";
import RichTextRenderer from "components/RichTextRenderer/RichTextRenderer";

export default function Description(props: { endowments: Endowment }) {
  const details = props.endowments || charity_details;

  return (
    <div className="grid grid-cols-a1">
      <LazyImage
        src={details.charity_logo || charity_details.icon}
        alt=""
        classes={`self-center row-span-2 w-32 h-24 bg-white ${
          details.iconLight ? "bg-angel-blue" : ""
        } rounded-sm object-contain mr-4 m-1`}
        width="130"
        height="96"
        rounded
      />
      <Link
        to={`${app.charity}/${details.endowment_address}`}
        className="col-start-2 text-lg text-angel-grey hover:text-angel-blue active:text-angel-blue font-bold pt-2 mb-1"
      >
        {details.charity_name}
      </Link>
      <div className="relative pr-16 text-sm text-angel-grey  leading-normal mb-2 line-clamp-3">
        <RichTextRenderer text={details.charity_overview} />
      </div>
    </div>
  );
}
