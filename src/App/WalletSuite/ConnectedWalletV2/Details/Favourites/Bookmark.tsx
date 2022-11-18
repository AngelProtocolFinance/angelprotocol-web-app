import { Link } from "react-router-dom";
import { EndowmentBookmark } from "types/aws";
import { AdminLink } from "components/admin";
import { appRoutes } from "constants/routes";

export default function Bookmark({ name, id }: EndowmentBookmark) {
  return (
    <li className="flex items-center gap-2 py-1">
      <p className="text-sm">{name}</p>
      <div className="flex items-center divide-x divide-gray-d2/20">
        <Link
          to={appRoutes.profile + "/" + id}
          className="text-xs uppercase text-blue active:text-orange pr-2"
        >
          Profile
        </Link>
        <AdminLink
          className="text-xs uppercase text-blue active:text-orange pl-2"
          id={id}
          label="admin"
        />
      </div>
    </li>
  );
}
