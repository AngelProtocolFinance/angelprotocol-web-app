import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import { appRoutes } from "constants/routes";
import Logo from "../Logo";

export default function Bookmark({ name, id, logo }: EndowmentBookmark) {
  return (
    <li>
      <Link
        to={appRoutes.profile + "/" + id}
        className="flex items-center gap-2 py-1 font-heading font-semibold text-sm hover:bg-orange-l5"
      >
        <Logo src={logo} className="w-4 h-4" />
        <span className="truncate max-w-[200px]">{name}</span>
      </Link>
    </li>
  );
}
