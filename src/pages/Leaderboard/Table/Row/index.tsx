import { Link } from "react-router-dom";
import { LeaderboardEntry } from "types/aws";
import defaultLogo from "assets/images/bettergiving-logo.png";
import Image from "components/Image";
import { Cells } from "components/TableSection";
import { appRoutes } from "constants/routes";
import Amount from "./Amount";
import projectFunds from "./projectFunds";

const defaultIcon = "/images/angelprotocol-horiz-blu.png";
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
      <Image
        src={charity_logo || defaultLogo}
        onError={(e) => e.currentTarget.setAttribute("src", defaultIcon)}
        loading="lazy"
        className="h-16 aspect-video rounded border border-gray-l3 dark:border-none dark:bg-white p-2"
      />
      <Link
        to={`../${appRoutes.marketplace}/${endowment_id}`}
        className="hover:text-blue active:text-blue-d1"
      >
        {charity_name}
      </Link>
      <Amount type="total" locked={total_lock} liquid={total_liq} />
      <Amount type="projected" locked={locked} liquid={liquid} />
    </Cells>
  );
}
