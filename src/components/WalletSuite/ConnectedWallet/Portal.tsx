import { Link } from "react-router-dom";
import { appRoutes } from "constants/routes";

export default function Portal(props: { address: string }) {
  return (
    <Link
      to={`${appRoutes.donations}/${props.address}`}
      className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
    >
      MY DONATIONS
    </Link>
  );
}
