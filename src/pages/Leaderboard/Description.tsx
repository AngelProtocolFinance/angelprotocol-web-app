import { Link } from "react-router-dom";
import { Endowment } from "services/aws/leaderboard/types";
import { charity_details } from "services/aws/endowments/placeholders";
import { app } from "types/routes";

export default function Description(props: { endowments: Endowment }) {
  const details = props.endowments || charity_details;

  return (
    <div className="grid grid-cols-a1">
      <img
        src={details.charity_logo || charity_details.icon}
        alt=""
        className={`self-center row-span-2 w-32 h-24 bg-white ${
          details.iconLight ? "bg-angel-blue" : ""
        } p-3 rounded-sm object-contain mr-4 m-1`}
      />

      <Link
        to={`${app.charity}/${details.endowment_address}`}
        className="col-start-2 text-lg text-angel-grey hover:text-angel-blgue active:text-angel-blue font-bold pt-2 mb-1"
      >
        {details.charity_name}
      </Link>
      <p className="relative pr-16 text-sm text-angel-grey  leading-normal mb-2 line-clamp-3">
        {details.charity_overview}
      </p>
    </div>
  );
}
