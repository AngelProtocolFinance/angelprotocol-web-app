import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import { appRoutes } from "constants/routes";

export default function Bookmark({ name, id, logo }: EndowmentBookmark) {
  return (
    <li>
      <Link
        to={appRoutes.profile + "/" + id}
        className="flex items-center gap-2 py-1 font-heading font-semibold text-sm hover:bg-orange-l5"
      >
        <img
          src={logo}
          alt=""
          className="w-4 h-4 border border-gray-l2 rounded-full"
        />
        {name}
      </Link>
    </li>
  );
}
