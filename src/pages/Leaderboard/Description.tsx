import { Endowment } from "services/aws/leaderboard/types";
import { charity_details } from "services/aws/endowments/placeholders";
import LazyImage from "components/LazyImage/LazyImage";

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
    </div>
  );
}
