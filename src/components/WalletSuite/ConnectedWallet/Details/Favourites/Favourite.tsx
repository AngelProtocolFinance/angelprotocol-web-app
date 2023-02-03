import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import Logo from "components/Logo";
import { appRoutes } from "constants/routes";

export default function Favourite({ name, endowId, logo }: EndowmentBookmark) {
  return (
    <li>
      <Link
        to={appRoutes.profile + "/" + endowId}
        className="flex items-center gap-2 py-1 font-heading font-semibold text-sm hover:bg-orange-l5 dark:hover:bg-blue-d3 rounded"
      >
        <Logo src={logo} className="w-4 h-4" />
        <span className="truncate max-w-[200px]">{name}</span>
      </Link>
    </li>
  );
}
