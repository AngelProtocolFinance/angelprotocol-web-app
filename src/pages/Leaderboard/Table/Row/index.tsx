import { Link } from "react-router-dom";
import { LeaderboardEntry } from "types/aws";
import defaultIcon from "assets/images/angelprotocol-horiz-blu.png";
import { Cells } from "components/TableSection";
import { appRoutes } from "constants/routes";
import Amount from "./Amount";
import projectFunds from "./projectFunds";

export default function Row({
  total_liq,
  total_lock,
  charity_logo,
  endowment_id,
  charity_name,
}: LeaderboardEntry) {
  const { locked, liquid } = projectFunds(10, total_lock, total_liq, 20, 5);
  return (
    <Cells type="td" cellClass="first:pl-4 last:pr-4 py-3">
      <img
        src={charity_logo || defaultIcon}
        onError={(e) => e.currentTarget.setAttribute("src", defaultIcon)}
        loading="lazy"
        alt=""
        className={`h-16 aspect-video rounded object-contain border border-gray-l3  dark:border-none dark:bg-white p-2`}
      />
      <Link
        to={`../${appRoutes.profile}/${endowment_id}`}
        className="hover:text-blue active:text-blue-d1"
      >
        {charity_name}
      </Link>
      <Amount type="total" locked={total_lock} liquid={total_liq} />
      <Amount type="projected" locked={locked} liquid={liquid} />
    </Cells>
  );
}
